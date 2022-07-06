document.body.addEventListener("change", function(e){
    let target = e.target;
    container = document.body.querySelector(".container")

    switch (target.id) {
        case "firstToggle":
            container.setAttribute("data-theme", "one");
            break;
        case "secToggle":
            container.setAttribute("data-theme", "two");
            break;
        case "thirdToggle":
            container.setAttribute("data-theme", "three")
            break;
        default:
            return;
    }
});
const calculator = {
    displayNumber : '399.981',
    operator : null,
    firstNumber : null,
    waitingForSecondNumber : false
};
const inputDigit = (digit) => {
    if(calculator.waitingForSecondNumber === true){
        calculator.displayNumber = digit;
        calculator.waitingForSecondNumber = false;
    } else {
        calculator.displayNumber += digit;
    }
};
const inputDecimal = (dot) => {
    if (calculator.waitingForSecondNumber === true) {
        calculator.displayNumber = '0.'
        calculator.waitingForSecondNumber = false;
        return;
    }    
  
    if (!calculator.displayNumber.includes(dot)) {
      calculator.displayNumber += dot;
    }
};
const handleOperator = (operator) => {
    if (!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber
        // calculator.displayNumber = '0'
    } else {
        alert('operator already set!');
    }
};
const performaCalculation = () => {
    let computation
    const prev = parseFloat(calculator.firstNumber)
    const current = parseFloat(calculator.displayNumber)
    if (isNaN(prev) || isNaN(current)) return
    switch (calculator.operator) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        alert("operator doesn't already set!");
    }
    calculator.displayNumber = `${parseFloat(computation.toFixed(7))}`
    calculator.operator = undefined
}
const resetCalculator = () => {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false
};
const deleteValue = () => {
    if(calculator.displayNumber === '0'){
        calculator.displayNumber = '0'
    } else {
    calculator.displayNumber = calculator.displayNumber.slice(0,-1);
    };
};
const updateDisplay = () => {
    document.querySelector(".display-number").innerHTML = calculator.displayNumber;
};
updateDisplay();

const buttons = document.querySelectorAll(".button");
for (let button of buttons){
    button.addEventListener('click', function(event){
        const target = event.target;

        if(target.classList.contains('reset')){
            resetCalculator();
            updateDisplay();
            return;
        }
        if(target.classList.contains('delete')){
            deleteValue();
            updateDisplay();
            return;
        }
        if (target.classList.contains('operator')){
            handleOperator(target.innerHTML);
            updateDisplay()
            return;
        }
        if (target.classList.contains('equals')) {
            performaCalculation();
            updateDisplay();
            return;
        }
    
        inputDigit(target.innerHTML);
        updateDisplay()
    });
}