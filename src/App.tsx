import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import {
	WebviewWindow,
	getCurrentWebviewWindow,
} from "@tauri-apps/api/webviewWindow";
import "./App.css";
import { MouseSettings } from "./MouseSettings";

const isSettings = window.location.hash === "#settings";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	// const [keyboardListening, setKeyboardListening] = useState(false);
	const [name, setName] = useState("");

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke("greet", { name }));
	}

	return (
		<main className="container">
			<h1>Welcome to Tauri + React</h1>
			<div className="row">
				<a href="https://vite.dev" target="_blank">
					<img src="/vite.svg" className="logo vite" alt="Vite logo" />
				</a>
				<a href="https://tauri.app" target="_blank">
					<img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<p>Click on the Tauri, Vite, and React logos to learn more.</p>
			<form
				className="row"
					onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
			>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
			</form>
			<p>{greetMsg}</p>
			<MouseSettings/>

			{/* <button onToggle={() => handleMouseToggle}>
				{keyboardListening ? "Stop Keyboard Listener" : "Start Keyboard Listener"}
			</button>

			{
				mouseInput ? 
				<>
					<p>Mouse Coords: {mouseInput.coords[0]}, {mouseInput.coords[1]}</p>
					<p>Mouse Buttons: {mouseInput.button_pressed[1]}, {mouseInput.button_pressed[2]}, {mouseInput.button_pressed[3]}, {mouseInput.button_pressed[4]}, {mouseInput.button_pressed[5]}</p>
					<p>Right Mouse Button: {mouseInput.button_pressed[2]}</p>
				</> : "No Mouse Input Registered"
			} */}
		</main>
	);
}

export default App;
