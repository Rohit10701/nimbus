import { ipcMain } from "electron";

export function sendFieldSuggestions() {

    ipcMain.on('request-message', (event, arg) => {
        console.log(`Received request: ${arg}`);
        const responseMessage = `Message from backend: ${arg}`;
        // Send a response back to the renderer process
        event.reply('response-message', responseMessage);
    });
}

