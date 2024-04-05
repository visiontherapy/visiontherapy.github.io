
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

document.querySelector("#reload").onclick = function (e) {
  showchart();
};

