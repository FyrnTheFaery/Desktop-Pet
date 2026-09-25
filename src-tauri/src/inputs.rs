use device_query::{DeviceQuery, DeviceState, Keycode};
use tauri::ipc::Channel;
use std::time::Duration;

#[derive(Clone, serde::Serialize)]
pub struct MouseInputs {
    coords: (i32, i32),
    button_pressed: Vec<bool>
}

#[tauri::command]
pub async fn get_input_streams(on_keyboard_change: Channel<Vec<String>>, on_mouse_change: Channel<MouseInputs>) -> Result<(), String> {
    std::thread::spawn(move || {
        let device_state = DeviceState::new();
        
        let mut prev_keys: Vec<Keycode> = Vec::new();
        let mut prev_mouse_coords = (0, 0);
        let mut prev_mouse_button_pressed: Vec<bool> = Vec::new();

        loop {
            // 1. Check Keyboard independently
            let cur_keys = device_state.get_keys();
            if cur_keys != prev_keys {
                let key_strs: Vec<String> = cur_keys.iter().map(|k| format!("{:?}", k)).collect();
                if on_keyboard_change.send(key_strs).is_err() { break; } // Check for closed channel
                prev_keys = cur_keys;
            }

            // 2. Check Mouse independently 
            let cur_mouse = device_state.get_mouse();
            if cur_mouse.coords != prev_mouse_coords || cur_mouse.button_pressed != prev_mouse_button_pressed {
                let payload = MouseInputs {
                    coords: cur_mouse.coords,
                    button_pressed: cur_mouse.button_pressed.clone(),
                };
                if on_mouse_change.send(payload).is_err() { break; } // Check for closed channel
                prev_mouse_coords = cur_mouse.coords;
                prev_mouse_button_pressed = cur_mouse.button_pressed;
            }

            std::thread::sleep(Duration::from_millis(8));
        }
    });
    Ok(())
}