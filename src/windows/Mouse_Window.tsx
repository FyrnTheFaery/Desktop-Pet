import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

let mouseCounter = 0;

export async function spawnMouseWindow(title: string, width: number, height: number) {
    mouseCounter++;
    const uniqueLabel = `mouse-${mouseCounter}`;

    const webview = new WebviewWindow(uniqueLabel, {
        url: 'mouse.html', // Maybe make this an input param?
        title: title,
        width: width,
        height: height,
        transparent: true
    });

    webview.once('tauri://created', () => {
        console.log(`Window ${uniqueLabel} successfully spawned!`);
    });

    webview.once('tauri://error', (e) => {
        console.error('Failed to create window:', e);
    });
}

const MouseWindow: React.FC<{}> = ({}) => {
    return (
        <p>Mouse Window</p>
    );
}