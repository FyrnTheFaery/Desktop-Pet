import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

let keyboardCounter = 0;

export async function spawnKeyboardWindow(title: string, width: number, height: number) {
    keyboardCounter++;
    const uniqueLabel = `keyboard-${keyboardCounter}`;

    const webview = new WebviewWindow(uniqueLabel, {
        url: 'keyboard.html', // Maybe make this an input param?
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

const KeyboardWindow: React.FC<{}> = ({}) => {
    return (
        <p>Keyboard Window</p>
    );
}