import { Channel, invoke } from "@tauri-apps/api/core";
import { useState } from "react";

interface MouseSettingsProps {} 

export interface MouseInput {
	coords: [number, number];
	button_pressed: boolean[];
}

export const MouseSettings: React.FC<MouseSettingsProps> = ({}) => {

	const [isMouseListening, setIsMouseListening] = useState(false);
	const [mouseInput, setMouseInput] = useState<MouseInput>();

    async function startMouseListener() {
		const channel = new Channel<MouseInput>();
		
		console.log("I'm in the mouse listener func");

		channel.onmessage = (mouse) => {

			const [x, y] = mouse.coords;
			const buttons = mouse.button_pressed;

			console.log(`Mouse position: X: ${x}, Y: ${y}`);
			
			// Check if the left mouse button (usually index 0 or 1 depending on OS bindings) is pressed
			if (buttons[1]) {
			console.log("Left mouse button is pressed!");
			}

			setMouseInput(mouse);
		};

		try {
			// 3. Make sure the argument name matches your Rust function signature (e.g., "channel")
			await invoke('init_mouse_stream', { channel, state: true });
			console.log("Mouse stream initialized successfully.");
		} catch (error) {
			console.error("Failed to initialize mouse stream:", error);
		}
	}

	async function stopMouseListener() {
		try {
			await invoke('drop_mouse_stream');
		}
		catch (error) {
			console.error("Failed to drop mouse stream:", error);
		}
	}

	function handleMouseToggle() {
		setIsMouseListening(!isMouseListening);
		if(!isMouseListening) {
			startMouseListener();
		}
		else {
			stopMouseListener();
		}
	}

    return (
        <>
            <button onClick={() => handleMouseToggle()}>
				{isMouseListening ? "Stop Mouse Listener" : "Start Mouse Listener"}
			</button>

			{
				isMouseListening ? <p>Mouse Listener On!</p> : <p>Mouse Listener Off!</p>
			}

			{
				isMouseListening && mouseInput ? 
				<>
					<p>Mouse Coords: {mouseInput.coords[0]}, {mouseInput.coords[1]}</p>
					<p>Mouse Buttons: {mouseInput.button_pressed[1]}, {mouseInput.button_pressed[2]}, {mouseInput.button_pressed[3]}, {mouseInput.button_pressed[4]}, {mouseInput.button_pressed[5]}</p>
				</> : <>
					<p>No Mouse Coordinates</p>
					<p>No Mouse Button Inputs</p>
				</>
			}
        </>
    );
};