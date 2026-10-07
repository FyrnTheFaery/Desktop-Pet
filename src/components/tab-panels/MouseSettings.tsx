import { Channel, invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import Button from "../wrappers/Button";
import { MouseModel } from "../models/MouseModel";

interface MouseSettingsProps {} 

export interface MouseInput {
	coords: [number, number];
	button_pressed: boolean[];
}

export const MouseSettings: React.FC<MouseSettingsProps> = ({}) => {

	const [isMouseListening, setIsMouseListening] = useState(false);
	const [mouseInput, setMouseInput] = useState<MouseInput>();
	const MOUSE_ID = "MOUSE";

	// Make all windows stop listening if the listener is turned off
	useEffect(() => {
		const unlisten = listen<string>("stream-stopped", (event) => {
			if (event.payload === MOUSE_ID) {
				setIsMouseListening(false);
				setMouseInput(undefined);
			}
		});
		return () => { unlisten.then((stop) => stop()); };
	}, []);

	// Make sure that any new windows can respond to and update the listener
	useEffect(() => {
		const join = () => startMouseListener(true).then((joined) => {
			if (joined) setIsMouseListening(true);
		});
		join();

		const unlisten = listen<string>("stream-started", (event) => {
			if (event.payload === MOUSE_ID) join();
		});
		return () => { unlisten.then((stop) => stop()); };
	}, []);

	// With joinOnly, only joins a running listener. Returns whether this window is now listening.
    async function startMouseListener(joinOnly = false): Promise<boolean> {
		const channel = new Channel<MouseInput>();

		channel.onmessage = (mouse) => {

			const [x, y] = mouse.coords;
			const buttons = mouse.button_pressed;

			console.log(mouse);
			console.log(`Mouse position: X: ${x}, Y: ${y}`);
			
			// Check if the left mouse button is pressed
			if (buttons[1]) {
				console.log("Left mouse button is pressed!");
			}

			setMouseInput(mouse);
		};

		try {
			const listening = await invoke<boolean>('init_mouse_stream', { channelId: MOUSE_ID, channel, joinOnly });
			console.log("Mouse stream initialized successfully.");
			return listening;
		} catch (error) {
			console.error("Failed to initialize mouse stream:", error);
			return false;
		}
	}

	async function stopMouseListener() {
		try {
			await invoke('drop_channel', { channelId: MOUSE_ID });
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
            <Button onClick={() => handleMouseToggle()}>
				{isMouseListening ? "Stop Mouse Listener" : "Start Mouse Listener"}
			</Button>

			{
				isMouseListening ? <p>Mouse Listener On!</p> : <p>Mouse Listener Off!</p>
			}

			{
				isMouseListening && mouseInput ? 
				<>
					<p>Mouse Coords: {mouseInput.coords[0]}, {mouseInput.coords[1]}</p>
					<p>Mouse Buttons: {String(mouseInput.button_pressed[1])}, {String(mouseInput.button_pressed[2])}, {String(mouseInput.button_pressed[3])}, {String(mouseInput.button_pressed[4])}, {String(mouseInput.button_pressed[5])}</p>
				</> : <>
					<p>No Mouse Coordinates</p>
					<p>No Mouse Button Inputs</p>
				</>
			}
			{/* <MouseModel outlineColor={Color} outlineThickness={0} leftButtonOutlineColor={undefined} leftButtonOutlineThickness={0} leftButtonColor={undefined} leftButtonPressedColor={undefined} middleButtonOutlineColor={undefined} middleButtonOutlineThickness={0} middleButtonColor={undefined} middleButtonPressedColor={undefined} rightButtonOutlineColor={undefined} rightButtonOutlineThickness={0} rightButtonColor={undefined} rightButtonPressedColor={undefined} bodyColor={undefined} showMouseBody={false} id={undefined} name={undefined} thumbnailSrc={undefined} width={0} height={0}/> */}
        </>
    );
};