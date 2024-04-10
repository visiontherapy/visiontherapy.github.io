
document.addEventListener("DOMContentLoaded", (e)=> {
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // dark mode
  document.querySelector("#darkmode").checked = true;
}

document.querySelector("#darkmode").onchange = function (e) {
  if (this.checked) {
    document.body.style.setProperty("--bg", "#000");
    document.body.style.setProperty("--fg", "#fff");
    document.body.style.setProperty("--ctrlbg", "#222");
  } else {
    document.body.style.setProperty("--bg", "#fff");
    document.body.style.setProperty("--fg", "#000");
    document.body.style.setProperty("--ctrlbg", "#ddf");
  }
};


});


function threestate(target) {
  console.log(target.dataset.state);
  if (!target.dataset.state) target.dataset.state = 0;
  if (target.dataset.state == "3") return "3";
  target.dataset.state = ++target.dataset.state % 3;

  switch (target.dataset.state) {
    case "0": console.log("off state"); break;
    case "1": console.log("mid state"); break;
    case "2": console.log("end state"); break;
  }
  console.log(target.dataset.state);
  return target.dataset.state;
}


//https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-hours-minutes-seconds

function pad2start(num) {
  return num.toString().padStart(2, '0');
}

function mstotime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  let millis = Math.floor(milliseconds % 1000 / 100);
  seconds = seconds % 60;
  minutes = minutes % 60;
  // hours = hours % 24; // roll over hours every 24 

  return `${pad2start(hours)}:${pad2start(minutes)}:${pad2start(seconds)}.${millis}`;
}


// get random value between min/max, inclusive
function minmax(min, max) {
  return min + Math.floor(Math.random() * (max - min +1));
}


/*
HOW TO notes:

// stackoverflow.com/questions/9229645
// array unique values:
let unique = [...new Set(array)];


// stackoverflow.com/questions/38774726
// get innerText of queryselectorall items
let allitems = [...document.querySelectorAll("span.selected")].map(o => o.innerText);



*/