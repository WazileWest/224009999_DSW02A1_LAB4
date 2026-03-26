const picsDiv = document.getElementById("pics");
const favoritesDiv = document.getElementById("favorites");
const actionsList = document.getElementById("actions");
const message = document.createElement("p");
const counter = document.createElement("p");

document.body.insertBefore(message, picsDiv);
document.body.insertBefore(counter, picsDiv);

const images = document.querySelectorAll("#pics img");

let selectedCount = 0;
images.forEach((img, index) => {
    img.dataset.index = index;
    img.title = img.alt;

    img.addEventListener("click", function () {

        if (img.parentElement.id === "favorites") return;
        favoritesDiv.appendChild(img);
        img.classList.add("selected");
        selectedCount++;
        addAction(`Moved ${img.src} to favorites`);
        message.textContent = `Image ${index + 1} selected as favorite number ${selectedCount}`;

        if (selectedCount === images.length) {
            message.textContent = "All images have been selected!";
        }

        updateCounter();
    });
});

favoritesDiv.addEventListener("click", function (e) {
    if (e.target.tagName !== "IMG") return;

    const img = e.target;
    img.classList.remove("selected");

    const originalIndex = parseInt(img.dataset.index);

    const currentImages = Array.from(picsDiv.children);

    let inserted = false;

    for (let i = 0; i < currentImages.length; i++) {
        if (parseInt(currentImages[i].dataset.index) > originalIndex) {
            picsDiv.insertBefore(img, currentImages[i]);
            inserted = true;
            break;
        }
    }

    if (!inserted) {
        picsDiv.appendChild(img);
    }

    selectedCount--;

    addAction(`Reverted ${img.src} back to the main list`);

    message.textContent = "Image reverted.";

    updateCounter();
});
function addAction(text) {
    const li = document.createElement("li");
    li.textContent = text;
    actionsList.appendChild(li);
}
function updateCounter() {
    const remaining = images.length - selectedCount;
    counter.textContent = `Remaining images: ${remaining}`;
}
updateCounter();