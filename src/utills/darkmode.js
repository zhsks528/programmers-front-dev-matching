const isUserColorTheme = localStorage.getItem("color-theme");
const isOsColorTheme = window.matchMedia("(perfers-color-scheme:dark)").matches
  ? "dark"
  : "light";

const darkmodeBtn = document.querySelector(".darkmode-btn");

function getUserTheme() {
  return isUserColorTheme ? isUserColorTheme : isOsColorTheme;
}

function applySetting() {
  window.addEventListener("load", function () {
    if (getUserTheme() === "dark") {
      localStorage.setItem("color-theme", "dark");
      document.documentElement.setAttribute("color-theme", "dark");
    } else {
      localStorage.setItem("color-theme", "light");
      document.documentElement.setAttribute("color-theme", "light");
    }
  });
}

export { applySetting };
