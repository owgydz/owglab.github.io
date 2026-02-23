function settingsApp() {
  return `
    <h3>Settings</h3>
    <p>Theme:</p>
    <button onclick="setTheme('blue')">Blue</button>
    <button onclick="setTheme('pink')">Pink</button>
    <button onclick="setTheme('dark')">Dark</button>
  `;
}

window.setTheme = function(theme) {
  if (theme === "blue")
    document.body.style.background =
      "linear-gradient(135deg,#00c6ff,#0072ff)";
  if (theme === "pink")
    document.body.style.background =
      "linear-gradient(135deg,#ff416c,#ff4b2b)";
  if (theme === "dark")
    document.body.style.background =
      "linear-gradient(135deg,#1f1f1f,#000000)";
};