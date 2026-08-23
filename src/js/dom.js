export function createDivElement(mainElement, className) {
  const element = document.createElement("div");
  element.classList.add(className);
  mainElement.appendChild(element);
  return element;
}
