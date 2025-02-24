// script.js
document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  let currentInput = '0';
  let previousInput = '';
  let operator = null;
  let isResultDisplayed = false;

  // Update display
  function updateDisplay(value) {
    display.value = value;
  }

  // Handle number and decimal inputs
  function handleNumber(value) {
    if (isResultDisplayed) {
      currentInput = value === '.' ? '0.' : value;
      isResultDisplayed = false;
    } else {
      currentInput = currentInput === '0' && value !== '.' ? value : currentInput + value;
    }
    updateDisplay(currentInput);
  }

  // Handle operator inputs
  function handleOperator(value) {
    if (isResultDisplayed) {
      previousInput = currentInput;
      isResultDisplayed = false;
    } else {
      previousInput = currentInput;
    }
    operator = value;
    currentInput = '';
  }

  // Perform calculation
  function calculate() {
    if (previousInput === '' || currentInput === '') return;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
          result = 'Error';
        } else {
          result = prev / current;
        }
        break;
      default:
        return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    isResultDisplayed = true;
    updateDisplay(currentInput);
  }

  // Clear the display
  function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    isResultDisplayed = false;
    updateDisplay(currentInput);
  }

  // Event listeners for buttons
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent.trim();
      if (value === 'AC') {
        clearDisplay();
      } else if (value === '=') {
        calculate();
      } else if (['+', '-', '×', '÷'].includes(value)) {
        handleOperator(value);
      } else {
        handleNumber(value);
      }
    });
  });

  // Handle keyboard input
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9' || key === '.') {
      handleNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      handleOperator(key === '*' ? '×' : key === '/' ? '÷' : key);
    } else if (key === 'Enter' || key === '=') {
      calculate();
    } else if (key === 'Backspace') {
      currentInput = currentInput.slice(0, -1) || '0';
      updateDisplay(currentInput);
    } else if (key === 'Escape') {
      clearDisplay();
    }
  });
});
