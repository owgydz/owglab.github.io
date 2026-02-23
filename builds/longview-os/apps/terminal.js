function terminalApp() {
  return `
    <div id="terminalOutput"
      style="background:black;color:#0f0;height:80%;overflow:auto;padding:5px;"></div>
    <input id="terminalInput"
      style="width:100%;background:black;color:#0f0;border:none;">
  `;
}

document.addEventListener("keydown", function(e){
  if (e.target.id === "terminalInput" && e.key === "Enter") {
    runCommand(e.target.value);
    e.target.value = "";
  }
});

function runCommand(cmd) {
  const out = document.getElementById("terminalOutput");
  out.innerHTML += "> " + cmd + "<br>";

  if (cmd === "help")
    out.innerHTML += "help, clear, files, sys<br>";

  else if (cmd === "clear")
    out.innerHTML = "";

  else if (cmd === "files")
    out.innerHTML += Object.keys(JSON.parse(localStorage.lvFiles)).join("<br>");

  else if (cmd === "sys")
    out.innerHTML += navigator.userAgent + "<br>";

  else
    out.innerHTML += "Unknown command<br>";

  out.scrollTop = out.scrollHeight;
}