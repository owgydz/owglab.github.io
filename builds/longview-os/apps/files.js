let fileSystem = JSON.parse(localStorage.getItem("miniFS")) || {
  "notes.txt": "Welcome to mini-os."
};

function persistFS() {
  localStorage.setItem("miniFS", JSON.stringify(fileSystem));
}

function filesApp() {
  return `
    <button onclick="createFile()">New File</button>
    <ul>
      ${Object.keys(fileSystem).map(f =>
        `<li>
          <span onclick="openFile('${f}')">${f}</span>
          <button onclick="deleteFile('${f}')">X</button>
        </li>`
      ).join("")}
    </ul>
  `;
}

function createFile() {
  const name = prompt("File name:");
  if (!name) return;
  fileSystem[name] = "";
  persistFS();
  launchApp("files");
}

function deleteFile(name) {
  delete fileSystem[name];
  persistFS();
  launchApp("files");
}

function openFile(name) {
  launchApp("editor");
  setTimeout(() => {
    const editor = document.querySelector(".window:last-child textarea");
    editor.value = fileSystem[name];
    editor.dataset.filename = name;
  }, 50);
}
