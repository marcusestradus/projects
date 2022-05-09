const currOperand = document.getElementById('curr-operand');
const prevOperand = document.getElementById('prev-operand');
const numButtons = document.querySelectorAll('[data-num]')
const opButtons = document.querySelectorAll('[data-op]')
const CE = document.querySelector('[data-clear-entry')
const equalsButton = document.getElementById('eq')
const allClear = document.querySelector('[data-all-clear]')
const bs = document.querySelector('[data-bs]')
const sq = document.querySelector('[data-square]')
const root = document.querySelector('[data-root]')
const signButton = document.querySelector('[data-sign]')
const percentButton = document.querySelector('[data-percent]')

var op = undefined;
var x = undefined;
var y = undefined;
var computation = undefined;

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNum(button)
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendOperation(button);
    })
})

CE.addEventListener('click', () => {
    clearEntry();
})

equalsButton.addEventListener('click', () => {
    compute();
})

allClear.addEventListener('click', () => {
    clearAll();
})

bs.addEventListener('click', () => {
    backspace();
})

sq.addEventListener('click', () => {
    squareNum(parseFloat(currOperand.innerText));
})

root.addEventListener('click', () => {
    squareRoot(parseFloat(currOperand.innerText));
})

signButton.addEventListener('click', () => {
    changeSign(parseFloat(currOperand.innerText));
})

percentButton.addEventListener('click', () => {
    getPercentage(parseFloat(currOperand.innerText));
})

function appendNum(button) {
    if (button.innerText == '.') {
        if (currOperand.innerText == '') {
            currOperand.innerText += '0.';
            return;
        } else if (currOperand.innerText.includes('.')) {    
            return;
        }
    }

    if(currOperand.innerText == '0') {
        currOperand.innerText = '';
    }

    if (currOperand.innerText == computation) {
        currOperand.innerText = '';
    }

    currOperand.innerText += button.innerText;
}

function appendOperation(button) {
    if (currOperand.innerText == '') { return; }
    if (op != undefined) { return; }

    x = parseFloat(currOperand.innerText);
    op = button.innerText;
    prevOperand.innerText = currOperand.innerText + " " + op;
    currOperand.innerText = '';
}

function clearEntry() {
    currOperand.innerText = "";
}

function compute() {
    if (prevOperand.innerText == '' || currOperand.innerText == '') { return; }

    y =  parseFloat(currOperand.innerText);
    
    switch (op) {
        case '+':
            computation = x + y;
            break;
        case '-':
            computation = x - y;
            break;
        case '*':
            computation = x * y;
            break;
        case '÷':
            computation = x / y;
            break;
        default:
            break;
    }

    currOperand.innerText = computation;
    prevOperand.innerText = '';
    op = undefined;
}

function clearAll() {
    prevOperand.innerText = '';
    currOperand.innerText = '';
    op = undefined;
}

function backspace() {
    if (currOperand.innerText[currOperand.innerText.length - 2] == '.') {
        currOperand.innerText = currOperand.innerText.slice(0, -1);
    }

    currOperand.innerText = currOperand.innerText.slice(0, -1);
}

function squareNum(n) {
    if (currOperand.innerText == '') { return; }

    currOperand.innerText = Math.pow(n, 2);
}

function squareRoot(n) {
    if (currOperand.innerText == '') { return; }

    currOperand.innerText = Math.sqrt(n);
}

function changeSign(n) {
    if (n > 0) {
        currOperand.innerText = -(Math.abs(n));
    } else if (n < 0) {
        currOperand.innerText = Math.abs(n);
    }
}

function getPercentage(n) {
    if (prevOperand.innerText == '' || currOperand.innerText == '') { return; }

    currOperand.innerText = (n / 100) * parseFloat(prevOperand.innerText);
}