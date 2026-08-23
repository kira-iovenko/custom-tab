import { createDivElement } from "./dom.js"

export function createClockElement(mainElement) {
    return createDivElement(mainElement, "clock");
}

export function createDateElement(mainElement) {
    return createDivElement(mainElement, "date");
}

export function updateTime(timeElement, dateElement) {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { month: 'short', day: 'numeric', weekday: 'short' });
  timeElement.textContent = time;
  dateElement.textContent = date;
}

