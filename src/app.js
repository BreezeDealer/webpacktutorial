var css = require("./app.scss");
console.log("this is app.js");
console.log("wow, it can refreshes automatically.");

var h2 = document.createElement("h3");
h2.innerHTML = "webpack-dev-server渲染的是内存里的文件"
document.body.appendChild(h2);