let inputBuffer = "";
let chaosActive = false;
let chaosInterval;

document.addEventListener("keydown", (e) => {
  if (chaosActive) return;

  if (e.key.length === 1) {
    inputBuffer += e.key;
    if (inputBuffer.length > 10) {
      inputBuffer = inputBuffer.slice(-10);
    }

    if (inputBuffer.includes("67")) {
      activate67Protocol();
      inputBuffer = "";
    }
  }
});

function activate67Protocol() {
  chaosActive = true;

  play67Sound(); // kill me please
  startAccentCycle();
  startScreenShake();
  startGlitch();

  setTimeout(() => {
    stopChaos();
  }, 6700);
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function startAccentCycle() {
  chaosInterval = setInterval(() => {
    const color = randomColor();
    document.documentElement.style.setProperty("--accent", color);
    document.documentElement.style.setProperty("--accent-soft", color + "33");
  }, 120);
}


function startScreenShake() {
  document.body.style.transition = "transform 0.05s";
  const shake = setInterval(() => {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    document.body.style.transform = `translate(${x}px, ${y}px)`;
  }, 50);

  setTimeout(() => clearInterval(shake), 6700);
}

function startGlitch() {
  const overlay = document.createElement("div");
  overlay.id = "glitch-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.pointerEvents = "none";
  overlay.style.background = "repeating-linear-gradient(0deg, rgba(255,0,0,0.05), rgba(0,255,255,0.05) 2px)";
  overlay.style.zIndex = "9999";

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
  }, 6700);
}

function play67Sound() {
  const audio = new Audio("67.mp3"); // put file in root
  audio.volume = 0.7;
  audio.play();
}

function stopChaos() {
  clearInterval(chaosInterval);
  document.body.style.transform = "none";

  document.documentElement.style.removeProperty("--accent");
  document.documentElement.style.removeProperty("--accent-soft");

  chaosActive = false;
}