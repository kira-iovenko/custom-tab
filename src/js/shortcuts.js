import { createDivElement } from "./dom.js"


export function createShortcutsElement(mainElement) {
    const shortcutsElement = createDivElement(mainElement, "shortcuts");
    const modalOverlay = addShortcutForm(mainElement, shortcutsElement);
    return { shortcutsElement, modalOverlay };
}

export function addShortcut(shortcutsElement, shortcut, index = -1) {
    const shortcutElement = document.createElement("a");
    shortcutElement.classList.add("shortcut");
    shortcutElement.href = shortcut.url;
    shortcutsElement.appendChild(shortcutElement);

    const shortcutIconElement = createDivElement(shortcutElement, "shortcut-icon");
    shortcutIconElement.textContent = shortcut.icon;
    const shortcutNameElement = createDivElement(shortcutElement, "shortcut-name");
    shortcutNameElement.textContent = shortcut.name;
    if (index >= 0) {
        const shortcutDeleteButton = document.createElement("button");
        shortcutDeleteButton.classList.add("shortcut-delete");
        shortcutDeleteButton.textContent = "x";
        shortcutDeleteButton.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            deleteShortcut(index, shortcutsElement);
        });
        shortcutElement.appendChild(shortcutDeleteButton);
    }
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

export function listShortcuts(shortcutsElement, modalOverlay) {
    shortcutsElement.innerHTML = "";
    const shortcuts = loadShortcuts();
    shortcuts.forEach((shortcut, index) => addShortcut(shortcutsElement, shortcut, index));
    const addButton = addNewShortcut(shortcutsElement);
    addButton.addEventListener("click", function (event) {
        event.preventDefault();
        openModal(modalOverlay);
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

function deleteShortcut(index, shortcutsElement) {
    const shortcuts = loadShortcuts();
    shortcuts.splice(index, 1);
    saveShortcuts(shortcuts);
    listShortcuts(shortcutsElement);
}

function openModal(modal) {
    modal.classList.add("open");
}

function addShortcutForm(mainElement, shortcutsElement) {
    const modalOverlay = createDivElement(mainElement, "modal-overlay");
    modalOverlay.innerHTML = `
    <div class="modal" id="modal">
        <div class="modal-header">
            <h2> Add shortcut</h2>
            <button class="modal-close" type="button" id="modal-close">X</button>
        </div>
        <form class="modal-form" id="shortcut-form">
        <input id="shortcut-name" type="text" placeholder="Name" required>
        <input id="shortcut-url" type="text" placeholder="https://example.com" required>
        <button type="submit">Add</button>
        </form>
    </div>
    `;

    const closeButton = document.getElementById("modal-close");
    function closeModal() {
        modalOverlay.classList.remove("open");
    }
    closeButton.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    })

    const form = document.getElementById("shortcut-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("shortcut-name").value;
        const url = document.getElementById("shortcut-url").value;
        console.log(name, url);
        const icon = name[0].toUpperCase();
        const shortcuts = loadShortcuts();
        shortcuts.push({ icon, name, url });
        saveShortcuts(shortcuts);
        listShortcuts(shortcutsElement, modalOverlay);
        closeModal();
    })

    return modalOverlay;
}