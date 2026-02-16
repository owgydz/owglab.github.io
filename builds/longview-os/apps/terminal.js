function terminalApp() {
  return `
    <div id="terminal-output" style="height: 180px; overflow-y: auto; margin-bottom: 6px;"></div>
    <input id="terminal-input" style="width:100%;" placeholder="type a command"
      onkeydown="handleCommand(event)">
  `;
}

function handleCommand(e) {
  if (e.key !== "Enter") return;

  const inputField = e.target;
  const command = inputField.value.trim();
  const output = inputField.parentElement.querySelector("#terminal-output");

  if (!command) return;

  printToTerminal(output, "> " + command);

  const args = command.split(" ");
  const base = args[0];

  switch (base) {

    case "help":
      printToTerminal(output, "Available commands:");
      printToTerminal(output, "help, clear, ls, open <file>, echo <text>");
      break;

    case "clear":
      output.innerHTML = "";
      break;

    case "ls":
      Object.keys(fileSystem).forEach(f => {
        printToTerminal(output, f);
      });
      break;

    case "open":
      if (!args[1]) {
        printToTerminal(output, "Usage: open <filename>");
        break;
      }
      if (!fileSystem[args[1]]) {
        printToTerminal(output, "File not found.");
        break;
      }
      openFile(args[1]);
      printToTerminal(output, "Opened " + args[1]);
      break;

    case "echo":
      printToTerminal(output, args.slice(1).join(" "));
      break;

    default:
      printToTerminal(output, "Unknown command.");
  }

  inputField.value = "";
  output.scrollTop = output.scrollHeight;
}

function printToTerminal(output, text) {
  const line = document.createElement("div");
  line.textContent = text;
  output.appendChild(line);
}
