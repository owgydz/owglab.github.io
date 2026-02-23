function filesApp() {
  if (!localStorage.lvFiles) {
    localStorage.lvFiles = JSON.stringify({});
  }

  function renderFiles() {
    const files = JSON.parse(localStorage.lvFiles);
    const list = document.getElementById("fileList");
    list.innerHTML = "";

    Object.keys(files).forEach(name => {
      const item = document.createElement("div");
      item.innerHTML = `
        📄 ${name}
        <button onclick="openNote('${name}')">Open</button>
        <button onclick="deleteFile('${name}')">X</button>
      `;
      list.appendChild(item);
    });
  }

  window.createFile = function() {
    const name = prompt("File name?");
    if (!name) return;
    const files = JSON.parse(localStorage.lvFiles);
    files[name] = "";
    localStorage.lvFiles = JSON.stringify(files);
    renderFiles();
  };

  window.deleteFile = function(name) {
    const files = JSON.parse(localStorage.lvFiles);
    delete files[name];
    localStorage.lvFiles = JSON.stringify(files);
    renderFiles();
  };

  window.openNote = function(name) {
    launchApp("notes");
    setTimeout(() => {
      loadNoteFile(name);
    }, 200);
  };

  setTimeout(renderFiles, 50);

  return `
    <h3>Files</h3>
    <button onclick="createFile()">New File</button>
    <div id="fileList" style="margin-top:10px;"></div>
  `;
}