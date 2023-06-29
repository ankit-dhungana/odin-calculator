//butons and text
const numButtons = document.querySelectorAll(".num-buttons");
const operatorButtons = document.querySelectorAll(".operators");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const lastOperandTxt = document.querySelector("[data-last-operand]");
const currentOperandTxt = document.querySelector("[data-current-operand]");

//event listeners for the buttons
numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNum(button.innerText);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.innerText);
  });
});

clearButton.addEventListener("click", () => {
  clear();
});

deleteButton.addEventListener("click", () => {
  deleteNum();
});

equalsButton.addEventListener("click", () => {
  operate();
});

//functions for the buttons
function appendNum(num) {
  if (num === "." && currentOperandTxt.innerText.includes(".")) return;
  if (currentOperandTxt.innerText.length > 10) return;
  currentOperandTxt.innerText += num;
}

function chooseOperator(operator) {
  if (currentOperandTxt.innerText === "") return;
  if (lastOperandTxt.innerText !== "") {
    operate();
  }
  lastOperandTxt.innerText = currentOperandTxt.innerText + operator;
  currentOperandTxt.innerText = "";
}

function operate() {
  let result;
  const last = parseFloat(lastOperandTxt.innerText);
  const current = parseFloat(currentOperandTxt.innerText);
  if (isNaN(last) || isNaN(current)) return;
  switch (lastOperandTxt.innerText.slice(-1)) {
    case "+":
      result = last + current;
      break;
    case "-":
      result = last - current;
      break;
    case "*":
      result = last * current;
      break;
    case "÷":
      result = last / current;
      break;
    case "%":
      result = (last / 100) * current;
      break;
    case "^":
      result = Math.pow(last, current);
      break;
    default:
      return;
  }
  currentOperandTxt.innerText = result.toFixed(2);
  lastOperandTxt.innerText = "";
}

function clear() {
  currentOperandTxt.innerText = "";
  lastOperandTxt.innerText = "";
}

function deleteNum() {
  currentOperandTxt.innerText = currentOperandTxt.innerText.slice(0, -1);
}
