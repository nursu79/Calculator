// Select necessary elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let expression = ""; 
let currentInput = ""; 
let lastResult = null; 

// Update the display
function updateDisplay() {
  display.value = expression || "0"; // Show "0" if the display is empty
  display.scrollLeft = display.scrollWidth;
}

// Event listener for number and operator buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (!isNaN(value) || value === ".") {
      // Append number or decimal point
      currentInput += value;
      expression += value;
    } else if (["+", "-", "*", "/"].includes(value)) {
      handleOperator(value);
    }

    updateDisplay();
  });
});

// Event listener for clear button
clearButton.addEventListener("click", () => {
  resetCalculator();
});

// Event listener for equals button
equalsButton.addEventListener("click", () => {
  if (expression) {
    try {
      const result = eval(expression); // Unsafe but works for local use
      display.value = `${expression} = ${result}`;
      lastResult = result; 
      expression = result.toString(); 
      currentInput = ""; 
    } catch (e) {
      display.value = "Error";
      resetCalculator();
    }
  }
});

// Handle operator input
function handleOperator(operator) {
  if (lastResult !== null && currentInput === "") {
    // Continue from the last result
    expression = `${lastResult} ${operator}`;
    lastResult = null;
  } else if (currentInput !== "" || /[+\-*/]$/.test(expression)) {
    // Prevent consecutive operators
    if (/[+\-*/]$/.test(expression)) {
      expression = expression.slice(0, -1); 
    }
    expression += ` ${operator} `;
    currentInput = ""; 
  }
  updateDisplay();
}

// Reset the calculator
function resetCalculator() {
  expression = "";
  currentInput = "";
  lastResult = null;
  updateDisplay();
}
