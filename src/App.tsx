// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import "./App.css";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "./components/wrappers/Tabs";
import { SettingsPanel } from "./components/tab-panels/SettingsPanel";
import { HomePanel } from "./components/tab-panels/HomePanel";
import { MousePanel } from "./components/tab-panels/MousePanel";

function App() {

	return (
		<main className={"container"}>
			<Tabs>
				<TabList>
					<Tab id="home">Home</Tab>
					<Tab id="input-settings">Input Settings</Tab>
					<Tab id="collaboration-settings">Collaboration Settings</Tab>
					<Tab id="mouse-model">Mouse Models</Tab>
					<Tab id="keyboard-model">Keyboard Models</Tab>
					<Tab id="pngtuber-model">PNGTuber Models</Tab>
				</TabList>
				<TabPanels>
					<TabPanel id="home">
						<HomePanel/>
					</TabPanel>
					<TabPanel id="input-settings">
						<SettingsPanel/>
					</TabPanel>
					<TabPanel id="collaboration-settings">
						<p>Collaboration Settings</p>
					</TabPanel>
					<TabPanel id="mouse-model">
						<MousePanel/>
					</TabPanel>
					<TabPanel id="keyboard-model">
						<p>Keyboard Panel</p>
					</TabPanel>
					<TabPanel id="pngtuber-model">
						<p>PNGTuber Panel</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</main>
	);
}

export default App;
