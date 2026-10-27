// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "./components/wrappers/Tabs";
import { SettingsPanel } from "./components/tab-panels/SettingsPanel";
import { HomePanel } from "./components/tab-panels/HomePanel";
import { ModelPanel } from "./components/tab-panels/ModelPanel";

function App() {

	return (
		<main className={"flex flex-col w-full h-full"}>
			<Tabs>
				<TabList className={"px-4 mt-4"}>
					<Tab id="home" className={"px-2"}>Home</Tab>
					<Tab id="models" className={"px-2"}>Models</Tab>
					<Tab id="collaboration-settings" className={"px-2"}>Collaboration</Tab>
					<Tab id="input-settings" className={"px-2"}>Settings</Tab>
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
					<TabPanel id="models">
						<ModelPanel/>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</main>
	);
}

export default App;
