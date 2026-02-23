let currentNoteFile = null;

function notesApp() {
  return `
    <h3>Notes</h3>
    <textarea id="noteArea"
      style="width:100%;height:85%;background:transparent;color:white;border:none;font-size:15px;"></textarea>
  `;
}

function loadNoteFile(name) {
  currentNoteFile = name;
  const files = JSON.parse(localStorage.lvFiles);
  document.getElementById("noteArea").value = files[name] || "";

  document.getElementById("noteArea").oninput = function() {
    files[name] = this.value;
    localStorage.lvFiles = JSON.stringify(files);
  };
}