import { createClockElement, createDateElement, updateTime } from "./js/clock.js"
import { createSearchElement } from "./js/search.js"
import { createShortcutsElement, addShortcut } from "./js/shortcuts.js"
import { addBackground } from "./js/background.js"

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const mainElement = document.querySelector("#app");

const clockElement = createClockElement(mainElement);
const dateElement = createDateElement(mainElement);
const searchElement = createSearchElement(mainElement);
const shortcutsElement = createShortcutsElement(mainElement);

updateTime(clockElement, dateElement);
setInterval(() => updateTime(clockElement, dateElement), 1000);

addShortcut(shortcutsElement, "G", "Google");
addShortcut(shortcutsElement, "Y", "Youtube");
addShortcut(shortcutsElement, "G", "Github");

addBackground();

// document.querySelector("#app").innerHTML = "<p>loading</p>";

// fetch(`https://api.nasa.gov/planetary/apod?date=2026-01-01&api_key=${API_KEY}`).
//   then(response => response.json()).then(data => {
//     let media;
//     if (data.media_type === "image") {
//         media = `<img src="${data.url}"/>`;
//     } else {
//         media = `<video src="${data.url}" controls></video>`;
//     }
//     document.querySelector("#app").innerHTML = `
//     <h1>${data.title}</h1>
//     ${media}
//     <p>${data.explanation}</p>
//     `;
//   }).catch(err => {
//     document.querySelector("#app").innerHTML = `<p>Error: ${err}</p>`;
//   })