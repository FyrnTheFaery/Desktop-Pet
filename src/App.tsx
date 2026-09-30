import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import {WebviewWindow} from "@tauri-apps/api/webviewWindow";
import "./App.css";
import { MouseSettings } from "./MouseSettings";
import Button from "./components/wrappers/Button";
import Divider from "./components/Divider";

let windowCounter = 0;

async function spawnWindow(title: string, width: number, height: number) {
  windowCounter++;
  const uniqueLabel = `window-${Date.now()}-${windowCounter}`;

  const webview = new WebviewWindow(uniqueLabel, {
    url: 'index.html', // Or a unique route like 'index.html#/settings'
    title: title,
    width: width,
    height: height,
  });

  webview.once('tauri://created', () => {
    console.log(`Window ${uniqueLabel} successfully spawned!`);
  });

  webview.once('tauri://error', (e) => {
    console.error('Failed to create window:', e);
  });
}

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
			{/* <h1>Welcome to Tauri + React</h1>
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
				<Button type="submit">Greet</Button>
			</form>
			<p>{greetMsg}</p> */}
			<Divider isHorizontal={true}/>
			<MouseSettings/>

			<Button onClick={() => spawnWindow("Test Window", 1000, 1000)}>Spawn Window</Button>
		</main>
	);
}

export default App;
