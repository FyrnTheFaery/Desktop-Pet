// FIX_ME - This needs to listen for mouse and keyboard input, and it should be associated with some UI, not just in a random TS file

import { invoke, Channel } from '@tauri-apps/api/core';



// export async function startMouseListener() {
// 	const channel = new Channel<MouseInput>();
	
// 	console.log("I'm in the mouse listener func");

// 	channel.onmessage = (mouse) => {
// 		// 2. Destructure or access using snake_case properties
// 		const [x, y] = mouse.coords;
// 		const buttons = mouse.button_pressed;

// 		console.log(`Mouse position: X: ${x}, Y: ${y}`);
		
// 		// Check if the left mouse button (usually index 0 or 1 depending on OS bindings) is pressed
// 		if (buttons[0]) {
// 		console.log("Mouse button is pressed!");
// 		}
// 	};

// 	try {
// 		// 3. Make sure the argument name matches your Rust function signature (e.g., "channel")
// 		await invoke('init_mouse_stream', { channel });
// 		console.log("Mouse stream initialized successfully.");
// 	} catch (error) {
// 		console.error("Failed to invoke mouse stream:", error);
// 	}
// }

export async function startKeyboardListener(callbackFunc: Function) {
	const channel = new Channel<Array<String>>();
	
	console.log("I'm in the mouse listener func");

	channel.onmessage = (keyStrs) => {
		// 2. Destructure or access using snake_case properties
		const keys: String = keyStrs.toString();

		console.log(`Keys: ` + keys);
		callbackFunc(keys)
	};

	try {
		// 3. Make sure the argument name matches your Rust function signature (e.g., "channel")
		await invoke('init_keyboard_stream', { onEvent: channel });
		console.log("Keyboard stream initialized successfully.");
	} catch (error) {
		console.error("Failed to invoke keyboard stream:", error);
	}
}