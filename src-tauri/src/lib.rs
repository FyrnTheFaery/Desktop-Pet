mod inputs;
use std::{sync::{Mutex}, collections::HashMap};
use tauri::Manager;

// use device_query::{DeviceQuery, DeviceState, MouseState, Keycode};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[tauri::command]
// fn get_models(models: &str) -> String {
//     format!("Models: {}", models)
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        // .manage(inputs::ChannelManager{Mutex::new(HashMap::new())})
        .setup(|app| {
            // Manage the state here before any command runs
            app.manage(inputs::ChannelManager(Mutex::new(HashMap::new())));
            Ok(())
        })
        .on_window_event(|window, event| {
            // Stop any input streams the closed window left running
            if let tauri::WindowEvent::Destroyed = event {
                inputs::drop_window_channels(window);
            }
        })
        .invoke_handler(tauri::generate_handler![greet,
            inputs::init_mouse_stream,
            inputs::init_keyboard_stream,
            inputs::drop_channel])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
