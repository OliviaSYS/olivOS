setInterval(function () {
    document.querySelector("#time").innerHTML = new Date().toLocaleString();
}, 1000);