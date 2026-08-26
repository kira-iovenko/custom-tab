import { createClockElement, createDateElement, updateTime } from "./js/clock.js"
import { createSearchElement } from "./js/search.js"
import { createShortcutsElement, listShortcuts } from "./js/shortcuts.js"
import { addBackground } from "./js/background.js"
import { createWidgets } from "./js/widgets.js";

const mainElement = document.querySelector("#app");

const clockElement = createClockElement(mainElement);
const dateElement = createDateElement(mainElement);
const searchElement = createSearchElement(mainElement);

const { shortcutsElement, modalOverlay } = createShortcutsElement(mainElement);
listShortcuts(shortcutsElement, modalOverlay);

updateTime(clockElement, dateElement);
setInterval(() => updateTime(clockElement, dateElement), 1000);

const widgets = createWidgets(mainElement);

addBackground();