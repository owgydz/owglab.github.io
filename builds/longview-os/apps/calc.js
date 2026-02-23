function calculatorApp() {
  return `
    <h3>Calculator</h3>
    <input id="calcInput" style="width:100%;padding:5px;">
    <button onclick="calculate()">=</button>
    <div id="calcResult"></div>
  `;
}

window.calculate = function() {
  const val = document.getElementById("calcInput").value;
  try {
    document.getElementById("calcResult").innerText = eval(val);
  } catch (e) {
    document.getElementById("calcResult").innerText = "Error";
  }
};