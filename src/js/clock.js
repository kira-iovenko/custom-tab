import { createDivElement } from "./dom.js"

export function createClockElement(mainElement) {
    const clockElement = createDivElement(mainElement, "clock");
    const minutesElement = document.createElement("span");
    minutesElement.className = "clock-minutes";
    const separatorElement = document.createElement("span");
    separatorElement.className = "clock-separator";
    separatorElement.textContent = ":";
    separatorElement.classList.add("hidden");
    const hoursElement = document.createElement("span");
    hoursElement.className = "clock-hours";
    clockElement.appendChild(minutesElement);
    clockElement.appendChild(separatorElement);
    clockElement.appendChild(hoursElement);
    return clockElement;
}

export function createDateElement(mainElement) {
    return createDivElement(mainElement, "date");
}

export function updateTime(timeElement, dateElement) {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { month: 'short', day: 'numeric', weekday: 'short' });
  const timeParts = time.split(":");
  timeElement.querySelector(".clock-minutes").textContent = timeParts[0];
  timeElement.querySelector(".clock-hours").textContent = timeParts[1];
  timeElement.querySelector(".clock-separator").classList.toggle("hidden");
  dateElement.textContent = date;
}

