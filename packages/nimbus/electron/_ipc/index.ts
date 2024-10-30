import { sendFieldSuggestions } from "./fieldSuggestions";

/**
 * Initializes the client-side IPC communication for field suggestions.
 * @throws {Error} If field suggestions initialization fails
 */
export async function runClientIpc(): Promise<void> {
    try {
        await sendFieldSuggestions();
    } catch (error) {
        console.error('Failed to initialize field suggestions:', error);
        throw error;
    }
}