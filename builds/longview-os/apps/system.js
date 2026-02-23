function systemApp() {
  setTimeout(updateSystemStats, 100);

  return `
    <h3>System Monitor</h3>
    <div id="sysStats"></div>
  `;
}

function updateSystemStats() {
  const el = document.getElementById("sysStats");
  if (!el) return;

  el.innerHTML = `
    CPU Cores: ${navigator.hardwareConcurrency}<br>
    Memory (approx): ${performance.memory?.usedJSHeapSize || "N/A"}<br>
    Windows Open: ${document.querySelectorAll(".window").length}<br>
  `;

  requestAnimationFrame(updateSystemStats);
}