let browserTabs = [];

function browserApp() {
  return `
    <div>
      <input id="urlInput" placeholder="Enter URL"
        style="width:70%;padding:5px;">
      <button onclick="goToURL()">Go</button>
      <button onclick="newTab()">New Tab</button>
    </div>
    <div id="tabBar" style="margin-top:5px;"></div>
    <iframe id="browserFrame"
      style="width:100%;height:75%;margin-top:5px;border:none;background:white;"></iframe>
  `;
}

window.goToURL = function() {
  const url = document.getElementById("urlInput").value;
  document.getElementById("browserFrame").src = url;
};

window.newTab = function() {
  browserTabs.push("about:blank");
  renderTabs();
};

function renderTabs() {
  const bar = document.getElementById("tabBar");
  bar.innerHTML = "";
  browserTabs.forEach((tab, i) => {
    const t = document.createElement("button");
    t.innerText = "Tab " + (i+1);
    t.onclick = () => {
      document.getElementById("browserFrame").src = tab;
    };
    bar.appendChild(t);
  });
}