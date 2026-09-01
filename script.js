const menuItem = document.querySelector("#menu-item");
const talkItem = document.querySelector("#talk-item");
const heroVideoContainer = document.querySelector(".cursor-follower-video-container");
const heroContainer = document.querySelector(".hero-container");
const darkItem = document.querySelector("#dark-mode-item");
const menuOverlay = document.querySelector(".menubar-overlay-container");

// MENU

menuItem.addEventListener("mouseenter", () => {
    const isOpen = menuOverlay.classList.contains("show");
    menuItem.textContent = isOpen ? "CLOSE" : "OPEN";
});

menuItem.addEventListener("mouseleave", () => {
    const isOpen = menuOverlay.classList.contains("show");
    menuItem.textContent = isOpen ? "MENU" : "MENU";
});

menuItem.addEventListener("click", () => {
    menuOverlay.classList.toggle("show");

    const isOpen = menuOverlay.classList.contains("show");

    document.body.classList.toggle("menu-open", isOpen);

    menuItem.textContent = isOpen ? "CLOSE" : "MENU";
});

// TALK

talkItem.addEventListener("mouseenter", () => {
    talkItem.textContent = "CONTACT US";
});

talkItem.addEventListener("mouseleave", () => {
    talkItem.textContent = "LET'S TALK";
});

// CURSOR FOLLOWER

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animateCursorVideo() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    heroVideoContainer.style.transform =
        `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursorVideo);
}

animateCursorVideo();

heroContainer.addEventListener("mouseenter", () => {
    heroVideoContainer.style.opacity = "1";
});

heroContainer.addEventListener("mouseleave", () => {
    heroVideoContainer.style.opacity = "0";
});

// DARK MODE

let isDark = false;

darkItem.addEventListener("click", () => {
    isDark = !isDark;

    document.body.classList.toggle("dark", isDark);

    darkItem.textContent = isDark ? "LIGHT MODE" : "DARK MODE";
});

// MENU ITEM HOVER IMAGES

const menuItems = document.querySelectorAll(".menubar_items");

menuItems.forEach((item) => {

    item.addEventListener("mouseenter", () => {
        const image = item.parentElement.querySelector("img");

        item.style.transform = "translateX(30px)";
        image.style.width = "100px";
    });

    item.addEventListener("mouseleave", () => {
        const image = item.parentElement.querySelector("img");

        item.style.transform = "translateX(0)";
        image.style.width = "0";
    });

});

// CURRENT TIME

function updateTime() {
    const currentTime = document.querySelector("#current_time");

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    currentTime.textContent = `${hours}:${minutes}:${seconds}`;
}

updateTime();

setInterval(updateTime, 1000);

// IMAGE STACK

const triggers = document.querySelectorAll(".hover-trigger");

triggers.forEach((trigger) => {

    const images = trigger.querySelectorAll(".stack-image");

    let index = 0;
    let interval = null;

    trigger.addEventListener("mouseenter", () => {

        if (interval) return;

        interval = setInterval(() => {

            images.forEach((image) => {
                image.style.opacity = "0";
            });

            const image = images[index];

            image.style.opacity = "1";

            const rotation = Math.random() * 10 - 5;

            image.style.setProperty(
                "--rotation",
                `${rotation}deg`
            );

            index++;

            if (index >= images.length) {
                index = 0;
            }

        }, 350);
    });

    trigger.addEventListener("mouseleave", () => {

        clearInterval(interval);
        interval = null;

        images.forEach((image) => {
            image.style.opacity = "0";
            image.style.zIndex = "1";
        });

        index = 0;
    });

});

// PLAYGROUND

const playgroundText = document.querySelector(".playground-text");
const portfolio = document.querySelector("#portfolio");

playgroundText.addEventListener("mousemove", (event) => {

    portfolio.style.left = `${event.clientX}px`;
    portfolio.style.top = `${event.clientY}px`;
    portfolio.style.opacity = "1";

});

playgroundText.addEventListener("mouseleave", () => {

    portfolio.style.opacity = "0";

});

// SERVICES

const serviceItems = document.querySelectorAll(".service-items");
const serviceImage = document.querySelector("#service-img");
const descriptionText = document.querySelector(".description-text");

serviceItems.forEach((item) => {

    item.addEventListener("mouseenter", () => {

        serviceImage.src = item.dataset.image;
        descriptionText.textContent = item.dataset.description;

        serviceImage.classList.add("show");
        descriptionText.classList.add("show");

    });

    item.addEventListener("mouseleave", () => {

        serviceImage.classList.remove("show");
        descriptionText.classList.remove("show");

    });

});


