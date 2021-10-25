const THEME_KEY = "theme";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem(THEME_KEY, themeName);
  document.documentElement.className = themeName;
}

// Immediately invoked function to set the theme on initial load
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");

  // Add theme toggle event listener
  slider.addEventListener("change", (event) =>
      setTheme(event.target.checked ? THEME_DARK : THEME_LIGHT)
  );

  // Load theme from local storage
  const theme = localStorage.getItem(THEME_KEY);
  setTheme(theme);
  slider.checked = theme === THEME_DARK;
});
