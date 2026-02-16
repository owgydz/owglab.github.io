let tabs = [];
let activeTab = null;

function newTab() {
  const id = Date.now();
  tabs.push({ id, url: "" });
  activeTab = id;
  renderTabs();
}

function renderTabs() {
  const container = document.getElementById("tabs");
  container.innerHTML = "";

  tabs.forEach(t => {
    const tab = document.createElement("div");
    tab.textContent = t.url || "New Tab";
    if (t.id === activeTab) tab.classList.add("active");
    tab.onclick = () => {
      activeTab = t.id;
      document.getElementById("viewer").src = t.url;
      renderTabs();
    };
    container.appendChild(tab);
  });
}

function loadPage() {
  const input = document.getElementById("urlInput").value;
  const tab = tabs.find(t => t.id === activeTab);
  if (!tab) return;

  tab.url = input.startsWith("http") ? input : "https://" + input;
  document.getElementById("viewer").src = tab.url;
  renderTabs();
}

newTab();
