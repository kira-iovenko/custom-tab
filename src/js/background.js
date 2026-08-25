export function addBackground() {
    const overlayElement = document.createElement("div");
    overlayElement.id = "overlay";
    document.body.prepend(overlayElement);
    updateBackgroundImage();
    setInterval(updateBackgroundImage, 60000);
}

function updateBackgroundImage() {
    const image = `https://picsum.photos/800/600?${new Date()}`;
    document.body.style.backgroundImage = `url("${image}")`;
}