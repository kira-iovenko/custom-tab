import { createDivElement } from "./dom.js"


export function createShortcutsElement(mainElement) {
    const shortcutsElement = createDivElement(mainElement, "shortcuts");
    return shortcutsElement;
}

export function addShortcut(shortcutsElement, shortcut) {
    const shortcutElement = document.createElement("a");
    shortcutElement.classList.add("shortcut");
    shortcutElement.href = shortcut.url;
    shortcutsElement.appendChild(shortcutElement);

    const shortcutIconElement = createDivElement(shortcutElement, "shortcut-icon");
    shortcutIconElement.textContent = shortcut.icon;
    const shortcutNameElement = createDivElement(shortcutElement, "shortcut-name");
    shortcutNameElement.textContent = shortcut.name;
    return shortcutElement;
}

export function addNewShortcut(shortcutsElement) {
    const newShortcutElement = addShortcut(shortcutsElement, {
        icon: "+",
        name: "Add new shortcut",
        url: "#"
    });
    return newShortcutElement;
}

const defaultShortcuts = [
  {
    icon: "G",
    name: "Google",
    url: "https://google.com"
  },
  {
    icon: "Y",
    name: "Youtube",
    url: "https://youtube.com"
  },
  {
    icon: "G",
    name: "GitHub",
    url: "https://github.com"
  },
]

export function listShortcuts(shortcutsElement) {
    shortcutsElement.innerHTML = "";
    const shortcuts = loadShortcuts();
    shortcuts.forEach(shortcut => addShortcut(shortcutsElement, shortcut));
    const addButton = addNewShortcut(shortcutsElement);
    addButton.addEventListener("click", function (event) {
        event.preventDefault();
        const newShortcut = {
            icon: "T",
            name: "test",
            url: "http://example.com"
        }
        shortcuts.push(newShortcut);
        saveShortcuts(shortcuts);
        listShortcuts(shortcutsElement, shortcuts);
    });
}

function saveShortcuts(shortcuts) {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
}

function loadShortcuts() {
    const shortcuts = localStorage.getItem("shortcuts");
    if (shortcuts) {
        return JSON.parse(shortcuts);
    }
    return defaultShortcuts;
}