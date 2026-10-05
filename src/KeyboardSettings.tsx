import { invoke, Channel } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { useEffect, useState } from 'react';
import Button from './components/wrappers/Button';

export interface KeyboardInput {
	type: "KeyboardInputs";
	keys: string[];
}

export const KeyboardSettings: React.FC<{}> = ({}) => {

	const [isKeyboardListening, setIsKeyboardListening] = useState(false);
	const [keyboardInput, setKeyboardInput] = useState<string[]>([]);
	const KEYBOARD_ID = "KEYBOARD";

	// Make all windows stop listening if the listener is turned off
	useEffect(() => {
		const unlisten = listen<string>("stream-stopped", (event) => {
			if (event.payload === KEYBOARD_ID) {
				setIsKeyboardListening(false);
				setKeyboardInput([]);
			}
		});
		return () => { unlisten.then((stop) => stop()); };
	}, []);

	// Make sure that any new windows can respond to and update the listener
	useEffect(() => {
		const join = () => startKeyboardListener(true).then((joined) => {
			if (joined) setIsKeyboardListening(true);
		});
		join();

		const unlisten = listen<string>("stream-started", (event) => {
			if (event.payload === KEYBOARD_ID) join();
		});
		return () => { unlisten.then((stop) => stop()); };
	}, []);

	// Either starts a new keyboard listener or only joins a running keyboard listener
	async function startKeyboardListener(joinOnly = false): Promise<boolean> {
		const channel = new Channel<KeyboardInput>();

		channel.onmessage = (keyboard) => {
			setKeyboardInput(keyboard.keys);
		};

		try {
			const listening = await invoke<boolean>('init_keyboard_stream', { channelId: KEYBOARD_ID, channel, joinOnly });
			console.log("Keyboard stream initialized successfully.");
			return listening;
		} catch (error) {
			console.error("Failed to invoke keyboard stream:", error);
			return false;
		}
	}

	async function stopKeyboardListener() {
		try {
			await invoke('drop_channel', { channelId: KEYBOARD_ID });
		}
		catch (error) {
			console.error("Failed to drop keyboard stream:", error);
		}
	}

	function handleMouseToggle() {
		setIsKeyboardListening(!isKeyboardListening);
		if(!isKeyboardListening) {
			startKeyboardListener();
		}
		else {
			stopKeyboardListener();
		}
	}

    return (
        <>
            <Button onClick={() => handleMouseToggle()}>
				{isKeyboardListening ? "Stop Keyboard Listener" : "Start Keyboard Listener"}
			</Button>

			{
				isKeyboardListening ? <p>Keyboard Listener On!</p> : <p>Keyboard Listener Off!</p>
			}

			{
				isKeyboardListening && keyboardInput ?
				<>
					<p>Keys Pressed: {keyboardInput.join(", ")}</p>
				</> : <>
					<p>No Keyboard Input</p>
				</>
			}
        </>
    );
}