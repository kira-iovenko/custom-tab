import { createDivElement } from "./dom.js"


export function createSearchElement(mainElement) {
    const searchElement = createDivElement(mainElement, "search");
    const inputElement = document.createElement("input");
    inputElement.name = "search"
    inputElement.type = "text";
    inputElement.placeholder = "Search Google";

    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            search(inputElement);
        }
    });

    const buttonElement = document.createElement("span");
    buttonElement.textContent = "Search";
    buttonElement.addEventListener("click", function() {
        search(inputElement);
    })

    searchElement.appendChild(inputElement);
    searchElement.appendChild(buttonElement);

    return searchElement;
}

function search(inputElement) {
    const searchText = encodeURIComponent(inputElement.value.trim());
    if (searchText === "") {
        return;
    }
    const searchUrl = `https://www.google.com/search?q=${searchText}`;
    inputElement.value = "";
    window.location.href = searchUrl;
}