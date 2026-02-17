function terminalApp() {
  return `
    <div id="terminal-output" style="height:150px; overflow-y:auto;"></div>
    <input id="terminal-input" style="width:100%;" 
      placeholder="type command"
      onkeydown="handleCommand(event)">
  `;
}

function handleCommand(e) {
  if (e.key !== "Enter") return;

  const input = e.target.value.trim();
  const output = e.target.parentElement.querySelector("#terminal-output");

  printLine(output, "> " + input);

  const args = input.split(" ");
  const cmd = args[0];

  switch (cmd) {
    case "help":
      printLine(output, "Commands: help, ls, cat, touch, rm, clear");
      break;

    case "ls":
      Object.keys(fileSystem).forEach(f => printLine(output, f));
      break;

    case "cat":
      if (!fileSystem[args[1]]) {
        printLine(output, "File not found.");
      } else {
        printLine(output, fileSystem[args[1]]);
      }
      break;

    case "touch":
      fileSystem[args[1]] = "";
      persistFS();
      printLine(output, "Created " + args[1]);
      break;

    case "rm":
      delete fileSystem[args[1]];
      persistFS();
      printLine(output, "Deleted " + args[1]);
      break;

    case "clear":
      output.innerHTML = "";
      break;

    default:
      printLine(output, "Unknown command.");
  }

  e.target.value = "";
  output.scrollTop = output.scrollHeight;
}

function printLine(output, text) {
  const div = document.createElement("div");
  div.textContent = text;
  output.appendChild(div);
}
