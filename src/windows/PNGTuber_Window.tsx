import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Layer, PNGTuberModel } from "../components/models/PNGTuberModel";

let pngtuberCounter = 0;

export async function spawnPNGTuberWindow(title: string, width: number, height: number) {
    pngtuberCounter++;
    const uniqueLabel = `keyboard-${pngtuberCounter}`;

    const webview = new WebviewWindow(uniqueLabel, {
        url: 'pngtuber.html', // Maybe make this an input param?
        title: title,
        width: width,
        height: height,
        transparent: true
    });

    webview.once('tauri://created', () => {
        console.log(`Window ${uniqueLabel} successfully spawned!`);
    });

    webview.once('tauri://error', (e) => {
        console.error('Failed to create PNGTuber window:', e);
    });
}

export interface PNGTuberWindowProps {
    foreground: Layer[];
    pngTuber: PNGTuberModel;
    background: Layer[];
}

const PNGTuberWindow: React.FC<PNGTuberWindowProps> = ({}) => {
    return (
        <>
            <p>PNGTuber Window</p>
        </>
    );
}