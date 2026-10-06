import Button from "../wrappers/Button";
import { KeyboardSettings } from "./KeyboardSettings";
import { MouseSettings } from "./MouseSettings";
import {WebviewWindow} from "@tauri-apps/api/webviewWindow";

export const SettingsPanel: React.FC<{}> = () => {

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

    return (
        <>
            <MouseSettings/>
            <KeyboardSettings/>
            <Button onClick={() => spawnWindow("Test Window", 800, 600)}>Spawn Window</Button>
        </>
    );
}