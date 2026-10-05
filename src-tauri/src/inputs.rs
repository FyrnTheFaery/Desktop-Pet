use device_query::{DeviceQuery, DeviceState, Keycode};
use tauri::{ipc::Channel};
use tauri::{AppHandle, Emitter, Manager, Runtime, State, Window};
use tokio_util::sync::CancellationToken;
use std::{sync::{Arc, Mutex}, collections::HashMap};

// #[derive(Clone, serde::Serialize)]
// pub struct MouseInputs {
//     coords: (i32, i32),
//     button_pressed: Vec<bool>
// }

#[derive(Clone, serde::Serialize)]
#[serde(tag = "type")]
pub enum DeviceInputs {
    MouseInputs {coords: (i32, i32), button_pressed: Vec<bool>},
    KeyboardInputs {keys: Vec<String>}
}

// Each window's channel, keyed by window label, plus the last input sent so joining windows can catch up
#[derive(Default)]
pub struct StreamData {
    channels: HashMap<String, Channel<DeviceInputs>>,
    latest: Option<DeviceInputs>,
}

type Subscribers = Arc<Mutex<StreamData>>;

// Names of the events sent to every window when a listener is started or stopped. Payload is the channel id.
pub const STREAM_STARTED_EVENT: &str = "stream-started";
pub const STREAM_STOPPED_EVENT: &str = "stream-stopped";

// One shared listener per device. Every subscribed window receives its input.
pub struct InputStream {
    token: CancellationToken,
    subscribers: Subscribers,
}

// Streams are keyed by channel id (e.g. "MOUSE", "KEYBOARD")
#[derive(Default)]
pub struct ChannelManager(pub Mutex<HashMap<String, InputStream>>);

enum Subscription {
    // Joined a listener that was already running
    Joined,
    // No listener running and the caller only wanted to join one
    NotRunning,
    // No listener running; the caller must spawn one with these handles
    Start(CancellationToken, Subscribers),
}

// Adds the window to the device's listener. With join_only, never starts a new listener.
fn subscribe(window_label: String, channel_id: String, channel: Channel<DeviceInputs>, join_only: bool, state: &State<'_, ChannelManager>) -> Subscription {
    let mut streams = state.0.lock().unwrap();

    if let Some(stream) = streams.get(&channel_id) {
        let mut subscribers = stream.subscribers.lock().unwrap();
        // Join the running listener unless it is already shutting down
        if !stream.token.is_cancelled() {
            // Catch the new window up on the current input instead of waiting for the next change
            if let Some(latest) = &subscribers.latest {
                if channel.send(latest.clone()).is_err() { return Subscription::NotRunning; }
            }
            subscribers.channels.insert(window_label, channel);
            return Subscription::Joined;
        }
    }

    if join_only {
        return Subscription::NotRunning;
    }

    let stream = InputStream {
        token: CancellationToken::new(),
        subscribers: Arc::new(Mutex::new(StreamData {
            channels: HashMap::from([(window_label, channel)]),
            latest: None,
        })),
    };
    let handles = Subscription::Start(stream.token.clone(), stream.subscribers.clone());
    streams.insert(channel_id, stream);
    handles
}

// Sends the payload to every subscribed window, dropping windows whose channel has closed.
// Returns false (and cancels the listener) once no windows are left.
fn broadcast(payload: DeviceInputs, subscribers: &Subscribers, token: &CancellationToken) -> bool {
    let mut subscribers = subscribers.lock().unwrap();
    subscribers.channels.retain(|_, channel| channel.send(payload.clone()).is_ok());
    subscribers.latest = Some(payload);

    if subscribers.channels.is_empty() {
        token.cancel();
        return false;
    }
    true
}

// Stop the given device's listener for every window, and tell every window it stopped. Triggered in the frontend.
#[tauri::command]
pub async fn drop_channel(app: AppHandle, channel_id: String, state: State<'_, ChannelManager>) -> Result<(), String> {
    let stream = state.0.lock().unwrap().remove(&channel_id);

    if let Some(stream) = stream {
        stream.token.cancel();
    }
    app.emit(STREAM_STOPPED_EVENT, &channel_id).map_err(|e| e.to_string())
}

// Unsubscribe a window from every listener. Listeners with no windows left are stopped.
// Called when the window is destroyed.
pub fn drop_window_channels<R: Runtime>(window: &Window<R>) {
    let state = window.state::<ChannelManager>();
    let mut streams = state.0.lock().unwrap();

    streams.retain(|_, stream| {
        let mut subscribers = stream.subscribers.lock().unwrap();
        subscribers.channels.remove(window.label());
        if subscribers.channels.is_empty() {
            stream.token.cancel();
        }
        !stream.token.is_cancelled()
    });
}

// Sleeps for the poll interval. Returns false if the listener was cancelled while waiting.
async fn wait_for_next_poll(token: &CancellationToken) -> bool {
    token.run_until_cancelled(tokio::time::sleep(tokio::time::Duration::from_millis(8))).await.is_some()
}

// FIX_ME: Have one start stream function that starts a stream with the requested ID, channel, and state and passes the correct data to the frontend

// Inits a loop that listens to mouse input, or joins the one already running. Called from the frontend.
// With join_only, only joins a running listener. Returns whether the window is now listening.
#[tauri::command]
pub async fn init_mouse_stream(window: Window, channel_id: String, channel: Channel<DeviceInputs>, join_only: Option<bool>, state: State<'_, ChannelManager>) -> Result<bool, String> {

    let (token, subscribers) = match subscribe(window.label().to_string(), channel_id.clone(), channel, join_only.unwrap_or(false), &state) {
        Subscription::Joined => return Ok(true),
        Subscription::NotRunning => return Ok(false),
        Subscription::Start(token, subscribers) => (token, subscribers),
    };

    tokio::spawn(async move {
        let device_state = DeviceState::new();

        let mut prev_mouse_coords = (0, 0);
        let mut prev_mouse_button_pressed: Vec<bool> = Vec::new();

        // Try sending data to frontend
        loop {

            let cur_mouse = device_state.get_mouse();
            if cur_mouse.coords != prev_mouse_coords || cur_mouse.button_pressed != prev_mouse_button_pressed {
                let payload = DeviceInputs::MouseInputs {
                    coords: cur_mouse.coords,
                    button_pressed: cur_mouse.button_pressed.clone(),
                };
                // Check for all windows closed
                if !broadcast(payload, &subscribers, &token) { break; }
                prev_mouse_coords = cur_mouse.coords;
                prev_mouse_button_pressed = cur_mouse.button_pressed;
            }

            if !wait_for_next_poll(&token).await { break; }
        }
    });

    // Let the other windows know so they can join
    window.emit(STREAM_STARTED_EVENT, &channel_id).map_err(|e| e.to_string())?;
    Ok(true)
}

// Inits a loop that listens to keyboard input, or joins the one already running. Called from the frontend.
// With join_only, only joins a running listener. Returns whether the window is now listening.
#[tauri::command]
pub async fn init_keyboard_stream(window: Window, channel_id: String, channel: Channel<DeviceInputs>, join_only: Option<bool>, state: State<'_, ChannelManager>) -> Result<bool, String> {

    let (token, subscribers) = match subscribe(window.label().to_string(), channel_id.clone(), channel, join_only.unwrap_or(false), &state) {
        Subscription::Joined => return Ok(true),
        Subscription::NotRunning => return Ok(false),
        Subscription::Start(token, subscribers) => (token, subscribers),
    };

    tokio::spawn(async move {
        let device_state = DeviceState::new();

        let mut prev_keys: Vec<Keycode> = Vec::new();

        // Try sending data to frontend
        loop {
            let cur_keys = device_state.get_keys();
            if cur_keys != prev_keys {
                let payload = DeviceInputs::KeyboardInputs {
                    keys: cur_keys.iter().map(|k| format!("{:?}", k)).collect()
                };

                // Check for all windows closed
                if !broadcast(payload, &subscribers, &token) { break; }

                prev_keys = cur_keys;
            }

            if !wait_for_next_poll(&token).await { break; }
        }
    });

    // Let the other windows know so they can join
    window.emit(STREAM_STARTED_EVENT, &channel_id).map_err(|e| e.to_string())?;
    Ok(true)
}
