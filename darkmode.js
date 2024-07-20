  if (
    localCookie("darkmode") == "true" ||
  ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) && 
  typeof defaultlight === "undefined" ) ) {
    // dark mode
    // document.querySelector("#darkmode").checked = true;
    document.documentElement.setAttribute("data-theme", "dark");
  } else { 
    // document.querySelector("#darkmode").checked = false;
    document.documentElement.setAttribute("data-theme", "light");

  }