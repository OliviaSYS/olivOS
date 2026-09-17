setInterval(function () {
    document.querySelector("#time").innerHTML = new Date().toLocaleString();
}, 1000);

let selectedIcon = undefined;
let biggestIndex = 1;

function closeWindow(element) {
    element.style.display = "none";
}

function makeClosable(elementName) {
    const screen = document.querySelector("#" + elementName);
    const closeButton = document.querySelector("#" + elementName + "close");
    closeButton.addEventListener("click", () => closeWindow(screen));
}
function initializeWindow(elementName) {
    var screen = document.querySelector("#" + elementName);
    addWindowTapHandling(screen);
    makeClosable(elementName);
    dragElement(screen);
}

function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;
    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}
function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}
function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        const windowId = element.dataset.window;
        openWindow(document.querySelector("#" +windowId));
    } else {
        selectIcon(element);
    }
}
function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
};
function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex+1;
    if (selectedIcon) {
        deselectIcon(selectedIcon);
    }
}
function openWindow(element) {
    element.style.display="flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex+1;
}

const topBar = document.querySelector("#top");

initializeWindow("aboutme");
initializeWindow("welcome");
// var aboutmeScreen = document.querySelector("#aboutme");
// var aboutmeScreenClose = document.querySelector("#aboutmeclose")
// aboutmeScreenClose.addEventListener("click", () => closeWindow(aboutmeScreen));

// var welcomeScreen = document.querySelector("#welcome");
// var welcomeScreenClose = document.querySelector("#welcomeclose")
// var welcomeScreenOpen = document.querySelector("#welcomeopen")
// welcomeScreenClose.addEventListener("click", function() {
//     closeWindow(welcomeScreen);
// });

// welcomeScreenOpen.addEventListener("click", function() {
//     openWindow(welcomeScreen);
// });
// addWindowTapHandling(welcomeScreen);
// addWindowTapHandling(aboutmeScreen);
