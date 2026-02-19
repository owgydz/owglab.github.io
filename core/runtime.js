/* ==========================================
   Runtime Core — Website 5.0.0
========================================== */

const Runtime = {
  version: "5.0.0",
  woahVersion: "1.7.0",
  startTime: performance.now(),
  fps: 0,
  frameCount: 0,
  lastFrameTime: performance.now(),

  init() {
    this.startFPSMonitor();
    this.restoreTheme();
    console.log("Runtime initialized.");
  },

  /* ======================
     FPS MONITOR
  ====================== */

  startFPSMonitor() {
    const loop = (now) => {
      this.frameCount++;
      if (now - this.lastFrameTime >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.lastFrameTime = now;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  },


  getPerformanceData() {
    return {
      uptime: ((performance.now() - this.startTime) / 1000).toFixed(2),
      fps: this.fps,
      memory: performance.memory
        ? (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + " MB"
        : "Not Available",
      cores: navigator.hardwareConcurrency || "Unknown",
      platform: navigator.platform,
      userAgent: navigator.userAgent
    };
  },

  setTheme(themeClass) {
    document.body.className = themeClass;
    localStorage.setItem("woahTheme", themeClass);
  },

  restoreTheme() {
    const saved = localStorage.getItem("woahTheme");
    if (saved) document.body.className = saved;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Runtime.init();
});
