mod inputs;

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
        .invoke_handler(tauri::generate_handler![greet, inputs::get_input_streams])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
