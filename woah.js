function enterSandbox() {
  window.location.href = "sandbox/";
}

function breakSomething() {
  const panels = document.querySelectorAll(".panel");
  panels.forEach(p => {
    p.style.transform = `rotate(${Math.random() * 2 - 1}deg)`;
  });
}
