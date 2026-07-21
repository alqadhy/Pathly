import { groqProvider } from "./groqProvider";
import { openrouterProvider } from "./openrouterProvider";

// 👇 To switch providers/models later, just change this one line.
// e.g. export const aiProvider = openrouterProvider;
export const aiProvider = groqProvider;

// Exported in case you want to reference other providers elsewhere (e.g. a settings UI)
export { groqProvider, openrouterProvider };
export type { AIProvider, AIProviderMessage } from "./types";