import { createDivElement } from "./dom.js"


export function createSearchElement(mainElement) {
    const searchElement = createDivElement(mainElement, "search");
    const inputElement = document.createElement("input");
    inputElement.name = "search"
    inputElement.type = "text";
    inputElement.placeholder = "Search Google";
    searchElement.appendChild(inputElement);

    return searchElement;
}