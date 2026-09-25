// FIX_ME - This needs to listen for mouse and keyboard input, and it should be associated with some UI, not just in a random TS file

import { invoke, Channel } from '@tauri-apps/api/core';

// 1. Match the exact field names defined in your Rust struct
interface MyMousePayload {
  coords: [number, number];
  button_pressed: boolean[]; // 👈 Exactly as named in your Rust code
}

async function startListening() {
  const channel = new Channel<MyMousePayload>();
  
  channel.onmessage = (mouse) => {
    // 2. Destructure or access using snake_case properties
    const [x, y] = mouse.coords;
    const buttons = mouse.button_pressed;

    console.log(`Mouse position: X: ${x}, Y: ${y}`);
    
    // Check if the left mouse button (usually index 0 or 1 depending on OS bindings) is pressed
    if (buttons[0]) {
      console.log("Mouse button is pressed!");
    }
  };

  try {
    // 3. Make sure the argument name matches your Rust function signature (e.g., "channel")
    await invoke('stream_mouse', { channel });
    console.log("Mouse stream initialized successfully.");
  } catch (error) {
    console.error("Failed to invoke mouse stream:", error);
  }
}

startListening();