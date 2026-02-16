function renderEngine() {
  const html = document.getElementById("htmlInput").value;
  const css = document.getElementById("cssInput").value;
  const frame = document.getElementById("engineFrame");

  const doc = frame.contentDocument || frame.contentWindow.document;

  doc.open();
  doc.write(`
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `);
  doc.close();

  setTimeout(buildDOMTree, 50);
}

/* ===== FILE LOADER ===== */

document.getElementById("fileLoader").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    document.getElementById("htmlInput").value = event.target.result;
    renderEngine();
  };
  reader.readAsText(file);
});

/* ===== DOM TREE ===== */

function buildDOMTree() {
  const frame = document.getElementById("engineFrame");
  const doc = frame.contentDocument;
  const treeContainer = document.getElementById("domTree");
  treeContainer.innerHTML = "";

  function traverse(node, depth = 0) {
    if (node.nodeType !== 1) return; // element nodes only

    const div = document.createElement("div");
    div.className = "dom-node";
    div.style.marginLeft = depth * 10 + "px";
    div.textContent = "<" + node.tagName.toLowerCase() + ">";

    div.onclick = () => highlightNode(node);

    treeContainer.appendChild(div);

    Array.from(node.children).forEach(child => {
      traverse(child, depth + 1);
    });
  }

  traverse(doc.body);
}

/* ===== HIGHLIGHT ===== */

function highlightNode(node) {
  const frame = document.getElementById("engineFrame");
  const doc = frame.contentDocument;

  // remove old highlight
  doc.querySelectorAll(".__highlight__").forEach(el => {
    el.classList.remove("__highlight__");
    el.style.outline = "";
  });

  node.style.outline = "2px solid red";
}
 
document.addEventListener("DOMContentLoaded", renderEngine);
