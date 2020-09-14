// -------------------SELECTORS------------------------

let setColorBtn = document.getElementById("set-color-btn");
let userBrushColor = document.getElementById("user-brush-color");
let canvas = document.getElementById("canvas");
let search = document.getElementById("search");
let body = document.querySelector("body");
let resetBtn = document.getElementById("reset-btn");
let backgroundColor = "";
let userColor = "";

// -------------------FUNCTIONS------------------------

// ===CANVAS===

function createPixels() {
  for (let i = 0; i < 20000; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("pixel");
    canvas.appendChild(newDiv);
  }
}
createPixels();

// ===USER COLOR===

function changeBrushColor() {
  userColor = "";
  userColor = userBrushColor.value;
  if (userColor === "black") {
    setColorBtn.style.background = userColor;
    setColorBtn.style.color = "white";
    setColorBtn.style.border = "2px solid white";
  } else {
    setColorBtn.style.background = userColor;
  }
}

// ===CHANGE CANVAS COLOR===

function handleClick(e) {
  if (e.target.classList.contains("pixel")) {
    e.target.style.background = userColor;
    e.target.style.boxShadow = `0 0 20px 1px ${userColor}`;
    e.target.classList.add("rotate");
  }
}

// ===DISPLAY MOVIE POSTER===

function displayMovie(e) {
  if (e) {
    let url = `http://omdbapi.com/?t=${search.value}&apikey=92c58682`;
    console.log(search.value);
    jQuery.getJSON(url, (data) => {
      body.style.backgroundImage = `url(${data.Poster})`;
    });
  }
}

// ===RESET ===
function reset() {
  let canvasArray = Array.from(canvas.children);
  canvasArray.forEach((pixel) => {
    pixel.style.background = "black";
    pixel.style.border = `1px solid black`;
    pixel.style.boxShadow = "none";
    pixel.classList.remove("rotate");
  });
  setColorBtn.style.background = "white";
  setColorBtn.style.color = "black";
  setColorBtn.style.border = "2px solid black";
  setBGCBtn.style.background = "white";
  setBGCBtn.style.color = "black";
  setBGCBtn.style.border = "2px solid black";
  body.style.background = "black";
  userBrushColor.value = "";
  userBGC.value = "";
  search.value = "";
  userColor = "";
  backgroundColor = "";
}

// ===KEYBOARD HANDLING===

userBrushColor.addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    setColorBtn.click();
  }
});

// -------------------EVENT LISTENERS------------------------

setColorBtn.addEventListener("click", changeBrushColor);
setColorBtn.onclick = changeBrushColor();
canvas.addEventListener("mouseover", handleClick);
resetBtn.addEventListener("click", reset);
