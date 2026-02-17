let fileSystem = JSON.parse(localStorage.getItem("lvFS")) || {
  "readme.txt": "Welcome to LongviewOS."
};

function persistFS() {
  localStorage.setItem("lvFS", JSON.stringify(fileSystem));
}

function filesApp() {
  return `
    <button onclick="createFile()">New File</button>
    <ul>
      ${Object.keys(fileSystem).map(name =>
        `<li>
          <span onclick="openFile('${name}')">${name}</span>
          <button onclick="deleteFile('${name}')">X</button>
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
