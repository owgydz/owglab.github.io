function terminalApp() {
  return `
    <div id="terminal-output"></div>
    <input onkeydown="handleCommand(event)">
  `;
}

function handleCommand(e) {
  if (e.key === "Enter") {
    const output = document.getElementById("terminal-output");
    output.innerHTML += "<div>" + e.target.value + "</div>";
    e.target.value = "";
  }
}
