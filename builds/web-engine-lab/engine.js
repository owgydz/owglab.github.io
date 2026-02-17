const htmlInput = document.getElementById("htmlInput");
const cssInput = document.getElementById("cssInput");
const jsInput = document.getElementById("jsInput");
const frame = document.getElementById("engineFrame");
const metrics = document.getElementById("metrics");

htmlInput.value = "<h1>Web Engine 3.00</h1><div class='box'>Inspect Me</div>";
cssInput.value = ".box { padding:20px; margin:20px; background:lightgray; }";

let selectedNode = null;


function renderEngine() {
  const start = performance.now();
  const doc = frame.contentDocument;

  doc.open();
  doc.write(`
    <html>
      <head>
        <style>${cssInput.value}</style>
      </head>
      <body>
        ${htmlInput.value}
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    buildDOMTree();
    runCustomParser();
    const nodeCount = doc.querySelectorAll("*").length;
    const end = performance.now();
    metrics.innerText = `Nodes: ${nodeCount} | Render: ${(end - start).toFixed(2)}ms`;
  }, 50);
}


function buildDOMTree() {
  const doc = frame.contentDocument;
  const container = document.getElementById("domTree");
  container.innerHTML = "";

  function traverse(node, depth = 0) {
    if (node.nodeType !== 1) return;

    const div = document.createElement("div");
    div.style.marginLeft = depth * 12 + "px";
    div.textContent = "<" + node.tagName.toLowerCase() + ">";
    div.onclick = () => inspectNode(node);
    container.appendChild(div);

    Array.from(node.children).forEach(child => traverse(child, depth + 1));
  }

  traverse(doc.body);
}


function inspectNode(node) {
  selectedNode = node;
  showInspector(node);
}

function showInspector(node) {
  const styles = getComputedStyle(node);
  const inspector = document.getElementById("styleInspector");

  inspector.innerHTML = `
    Tag: ${node.tagName.toLowerCase()}<br>
    Classes: ${node.className}<br>
    Width: ${styles.width}<br>
    Height: ${styles.height}<br>
    Display: ${styles.display}<br>
    Margin: ${styles.margin}<br>
    Padding: ${styles.padding}
  `;
}


function runJS() {
  const doc = frame.contentDocument;
  try {
    const script = doc.createElement("script");
    script.innerHTML = jsInput.value;
    doc.body.appendChild(script);
  } catch (e) {
    alert("JS Error: " + e.message);
  }
}

document.getElementById("layoutDebug").addEventListener("change", function() {
  const doc = frame.contentDocument;
  if (!doc.body) return;

  if (this.checked) {
    doc.body.classList.add("layout-outline");
  } else {
    doc.body.classList.remove("layout-outline");
  }
});


document.getElementById("widthSlider").addEventListener("input", function() {
  frame.style.width = this.value + "px";
});

document.getElementById("liveToggle").addEventListener("change", function() {
  if (this.checked) {
    htmlInput.addEventListener("input", renderEngine);
    cssInput.addEventListener("input", renderEngine);
  } else {
    htmlInput.removeEventListener("input", renderEngine);
    cssInput.removeEventListener("input", renderEngine);
  }
});


function runCustomParser() {
  const output = document.getElementById("customParserOutput");
  const html = htmlInput.value;

  const matches = html.match(/<\/?([a-zA-Z0-9\-]+)/g) || [];
  output.innerHTML = matches.map(tag => tag.replace("<","&lt;")).join("<br>");
}

document.addEventListener("DOMContentLoaded", renderEngine);
