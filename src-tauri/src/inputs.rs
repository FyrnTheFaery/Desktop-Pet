use device_query::{DeviceQuery, DeviceState, Keycode};
use tauri::ipc::Channel;
use tauri::State;
use std::{sync::{Arc, atomic::{AtomicBool, Ordering}}, time::Duration};

#[derive(Clone, serde::Serialize)]
pub struct MouseInputs {
    coords: (i32, i32),
    button_pressed: Vec<bool>
}

pub struct MouseStreamState {
    pub is_streaming: Arc<AtomicBool>
}

// Inits a loop that listens to mouse input. Called from the frontend.
#[tauri::command]
pub async fn init_mouse_stream(channel: Channel<MouseInputs>, state: State<'_, MouseStreamState>) -> Result<(), String> {
    
    state.is_streaming.store(true, Ordering::Relaxed);

    let state_in_thread = state.is_streaming.clone();
    
    std::thread::spawn(move || {
        let device_state = DeviceState::new();

        let mut prev_mouse_coords = (0, 0);
        let mut prev_mouse_button_pressed: Vec<bool> = Vec::new();

        // Try sending data to frontend
        while state_in_thread.load(Ordering::Relaxed) {

            let cur_mouse = device_state.get_mouse();
            if cur_mouse.coords != prev_mouse_coords || cur_mouse.button_pressed != prev_mouse_button_pressed {
                let payload = MouseInputs {
                    coords: cur_mouse.coords,
                    button_pressed: cur_mouse.button_pressed.clone(),
                };
                // Check for closed channel
                if channel.send(payload).is_err() { break; }
                prev_mouse_coords = cur_mouse.coords;
                prev_mouse_button_pressed = cur_mouse.button_pressed;
            }

            std::thread::sleep(Duration::from_millis(8));
        }
    });

    Ok(())
}

// Drop the mouse stream. Triggered in the frontend.
#[tauri::command]
pub async fn drop_mouse_stream(state: State<'_, MouseStreamState>) -> Result<(), String> {
    state.is_streaming.store(false, Ordering::Relaxed);
    Ok(())
}



#[tauri::command]
pub async fn init_keyboard_stream(on_keyboard_change: Channel<Vec<String>>) -> Result<(), String> {
    std::thread::spawn(move || {
        let device_state = DeviceState::new();
        
        let mut prev_keys: Vec<Keycode> = Vec::new();

        loop {
            let cur_keys = device_state.get_keys();
            if cur_keys != prev_keys {
                let key_strs: Vec<String> = cur_keys.iter().map(|k| format!("{:?}", k)).collect();
                print!("Keys Pressed: {}", key_strs.concat());
                if on_keyboard_change.send(key_strs).is_err() { break; } // Check for closed channel
                prev_keys = cur_keys;
            }

            std::thread::sleep(Duration::from_millis(8));
        }
    });
    Ok(())
}