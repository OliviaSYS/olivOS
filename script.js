setInterval(function () {
    document.querySelector("#time").innerHTML = new Date().toLocaleString();
}, 1000);

let selectedIcon = undefined;
let biggestIndex = 1;
const topBar = document.querySelector("#top");


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
    if (element.id=="funfacts") {
        generatefunfact.click();
    }
    if (element.id === "blog") {
        setBlogContent(0);
    }
}

const facts = [
    "Bunnies are my favourite animal - as you can tell:)",
    "I combined my passions for competitive programming and creative coding in <em><a href=\"oliviasys.github.io/Olivia-s-Coding-Catalog\">Olivia's Coding Catalog</a></em>",
    "I participated in quite a few Hack Club programs, including HackPad, JumpStart, SoM, and more - check out all my projects @ <strong><a href=\"github.com/OliviaSYS\">my github</a></strong>!",
    "My team won <em>Best Women's Hack</em> at Ignition Hacks v.6!",
    "I have a twin sister!"
];

var blogContent = [
    {
        title: "Welcome!",
        date: "09/19/2026",
        content: `
        <p>Welcome to <strong>olivOS</strong> blog!</p>
        <p>Similar to the one on my personal website, I provide updates to my work in mathematics and programming, such achievements and new experiences!</p>
        <br>
        <p>To use this, click on any entries on the left side-bar. More features coming soon!</p>
        `
    },
    {
        title: "About olivOS",
        date: "09/19/2026",
        content: `
        <p>olivOS is a <em>web operating system</em> built with <strong>HTML, CSS, and JS</strong>; one that reflects my passions and interests while allowing users to interact with the UI!</p>
        <p>It's meant to be a place for others to learn more about me, as well as a playground with special features ~to come soon!</p>
        <p>This webOS was built while following the <a href="https://jams.hackclub.com/batch/webOS">JamHacks WebOS tutorial</a>, and submitted to</p> <blockquote><i><em>StarDance</i></em></blockquote><p> Hack Club missions.</p>
        `
    }
]

const displayfunfact = document.querySelector("#displayfunfact");
const generatefunfact = document.querySelector("#generatefunfact");

generatefunfact.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * 5);
    displayfunfact.innerHTML = facts[randomIndex];
});

var blogcontent = document.querySelector("#blogContent");

function setBlogContent(index) {
    blogcontent.innerHTML=blogContent[index].content;
}
function addToBlogSideBar(index) {
    var blogSideBar = document.querySelector("#blog-sidebar");
    var blog = blogContent[index];
    var newDiv = document.createElement("div");
    newDiv.classList.add("blog-entry");
    newDiv.innerHTML = `
        <p class="blog-title">${blog.title}</p>
        <p class="blog-date">${blog.date}</p>
    `;
    newDiv.addEventListener("click", function() {
        setBlogContent(index);
        document.querySelectorAll(".blog-entry").forEach(
            el => el.classList.remove("selected")
        );
        newDiv.classList.add("selected");
    });
    blogSideBar.appendChild(newDiv);
}

for (let i =0;i < blogContent.length; i++) {
    addToBlogSideBar(i);
}

const firstBlog= document.querySelector(".blog-entry");
if (firstBlog) {
    firstBlog.classList.add("selected");
}

initializeWindow("aboutme");
initializeWindow("welcome");
initializeWindow("funfacts");
initializeWindow("blog");