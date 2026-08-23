import { createDivElement } from "./dom.js"


export function createShortcutsElement(mainElement) {
    const shortcutsElement = createDivElement(mainElement, "shortcuts");
    const addNewShortcutElement = addShortcut(shortcutsElement, "+", "Add new shortcut");
    return shortcutsElement;
}

export function addShortcut(shortcutsElement, shortcutIcon, shortcutName) {
    const shortcutElement = createDivElement(shortcutsElement, "shortcut");
    const shortcutIconElement = createDivElement(shortcutElement, "shortcut-icon");
    shortcutIconElement.textContent = shortcutIcon;
    const shortcutNameElement = createDivElement(shortcutElement, "shortcut-name");
    shortcutNameElement.textContent = shortcutName;
    return shortcutElement;
}