// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import {WebviewWindow} from "@tauri-apps/api/webviewWindow";
import "./App.css";
import { MouseSettings } from "./MouseSettings";
import Button from "./components/wrappers/Button";
import Divider from "./components/Divider";
import { KeyboardSettings } from "./KeyboardSettings";

let windowCounter = 0;

async function spawnWindow(title: string, width: number, height: number) {
  windowCounter++;
  const uniqueLabel = `window-${Date.now()}-${windowCounter}`;

  const webview = new WebviewWindow(uniqueLabel, {
    url: 'index.html', // Maybe make this an input param?
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

	return (
		<main className="container">
			<Divider isHorizontal={true}/>
			<MouseSettings/>
			<KeyboardSettings/>

			<Button onClick={() => spawnWindow("Test Window", 600, 400)}>Spawn Window</Button>
		</main>
	);
}

export default App;
