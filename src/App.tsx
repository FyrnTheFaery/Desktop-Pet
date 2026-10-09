// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "./components/wrappers/Tabs";
import { SettingsPanel } from "./components/tab-panels/SettingsPanel";
import { HomePanel } from "./components/tab-panels/HomePanel";
import { MousePanel } from "./components/tab-panels/MousePanel";

function App() {

	return (
		<main className={"flex flex-col w-full h-fit m-4"}>
			<Tabs>
				<TabList>
					<Tab id="home" className={"mx-2"}>Home</Tab>
					<Tab id="pngtuber-model" className={"mx-2"}>PNGTubers</Tab>
					<Tab id="mouse-model" className={"mx-2"}>Mice</Tab>
					<Tab id="keyboard-model" className={"mx-2"}>Keyboards</Tab>
					<Tab id="collaboration-settings" className={"mx-2"}>Collaboration</Tab>
					<Tab id="input-settings" className={"mx-2"}>Settings</Tab>
				</TabList>
				<TabPanels>
					<TabPanel id="home">
						<HomePanel/>
					</TabPanel>
					<TabPanel id="input-settings">
						<SettingsPanel/>
					</TabPanel>
					<TabPanel id="collaboration-settings">
						<p>Collaboration</p>
					</TabPanel>
					<TabPanel id="mouse-model">
						<MousePanel/>
					</TabPanel>
					<TabPanel id="keyboard-model">
						<p>Keyboards</p>
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
