const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equal');
const deleteButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.clear');
const prevDisplay = document.querySelector('.prev-display');
const currDisplay = document.querySelector('.curr-display');

let currentOperand = '';
let previousOperand = '';
let operation = null;

function updateDisplay() {
    currDisplay.textContent = currentOperand;
    prevDisplay.textContent = operation ? `${previousOperand} ${operation}` : '';
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '/':
            computation = curr === 0 ? 'Error' : prev / curr;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
}

function del() {
    currentOperand = currentOperand.slice(0, -1);
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.textContent);
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});

allClearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    del();
    updateDisplay();
});
