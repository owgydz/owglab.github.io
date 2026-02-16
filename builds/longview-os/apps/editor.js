let openTabs = [];

function editorApp() {
  return `
    <div id="tabs"></div>
    <textarea id="editorArea" style="width:100%; height:150px;"></textarea>
    <button onclick="saveFile()">Save</button>
  `;
}

function saveFile() {
  const area = document.getElementById("editorArea");
  const name = area.dataset.filename || "untitled.txt";
  fileSystem[name] = area.value;
  persistFS();
}
