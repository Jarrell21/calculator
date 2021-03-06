const screen = document.querySelector('.screen');
const displayValue = document.querySelector('.display-value');
const displayEquation = document.querySelector('.display-equation');
const allButtons = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');
const eraseBtn = document.querySelector('#erase-btn');
const percentBtn = document.querySelector('#percent-btn');
const divideBtn = document.querySelector('#divide-btn');
const multiplyBtn = document.querySelector('#multiply-btn');
const subtractBtn = document.querySelector('#subtract-btn');
const addBtn = document.querySelector('#add-btn');
const equalBtn = document.querySelector('#equal-btn');
const pointBtn = document.querySelector('#point-symbol');
const num0Btn = document.querySelector('#number-0');
const num1Btn = document.querySelector('#number-1');
const num2Btn = document.querySelector('#number-2');
const num3Btn = document.querySelector('#number-3');
const num4Btn = document.querySelector('#number-4');
const num5Btn = document.querySelector('#number-5');
const num6Btn = document.querySelector('#number-6');
const num7Btn = document.querySelector('#number-7');
const num8Btn = document.querySelector('#number-8');
const num9Btn = document.querySelector('#number-9');

// Variables for the equation
const firstNum = document.createElement('p');
const secondNum = document.createElement('p');
const operator = document.createElement('p');
firstNum.classList.add('first-num');
secondNum.classList.add('second-num');
operator.classList.add('operator');
let fNumArray = [0];
let sNumArray = [0];
firstNum.textContent = fNumArray;
displayEquation.appendChild(firstNum);

let answer = 0;

// On click event listener for all the buttons in the calculator
allButtons.forEach(btn => btn.addEventListener('click', buttonFunc));

// On keydown event listener for the number and operator buttons 
window.addEventListener('keydown', buttonFuncKey);

// Function for when a button is clicked
function buttonFunc(e){
    switch(e.target){
        case clearBtn: clearFunc(); break;
        case eraseBtn: eraseFunc(); break;
        case percentBtn: percentBtnFunc(); break;
        case divideBtn: operatorBtnFunc(divideBtn); break;
        case multiplyBtn: operatorBtnFunc(multiplyBtn); break;
        case subtractBtn: operatorBtnFunc(subtractBtn); break;
        case addBtn: operatorBtnFunc(addBtn); break;
        case equalBtn: equalFunc(); break;
        case pointBtn: pointFunc(); break;
        case num0Btn: numFunc(0); break;
        case num1Btn: numFunc(1); break;
        case num2Btn: numFunc(2); break;
        case num3Btn: numFunc(3); break;
        case num4Btn: numFunc(4); break;
        case num5Btn: numFunc(5); break;
        case num6Btn: numFunc(6); break;
        case num7Btn: numFunc(7); break;
        case num8Btn: numFunc(8); break;
        case num9Btn: numFunc(9); break;
        default: alert('not yet added');
    }
}

// Function for when a key is pressed
function buttonFuncKey(e){
    switch(e.keyCode){
        case 8: eraseFunc(); break;
        case 111: operatorBtnFunc(divideBtn); break;
        case 106: operatorBtnFunc(multiplyBtn); break;
        case 109: case 189: operatorBtnFunc(subtractBtn); break;
        case 107: operatorBtnFunc(addBtn); break;
        case 13: case 187: equalFunc(); break;
        case 190: case 110: pointFunc(); break;
        case 48: case 96: numFunc(0); break;
        case 49: case 97: numFunc(1); break;
        case 50: case 98: numFunc(2); break;
        case 51: case 99: numFunc(3); break;
        case 52: case 100: numFunc(4); break;
        case 53: case 101: numFunc(5); break;
        case 54: case 102: numFunc(6); break;
        case 55: case 103: numFunc(7); break;
        case 56: case 104: numFunc(8); break;
        case 57: case 105: numFunc(9); break;
    }
}

// Clear button function that clears the calculator screen and the previous data
function clearFunc(){
    displayValue.textContent = '';
    displayEquation.textContent = '';
    fNumArray = [0];
    firstNum.textContent = fNumArray;
    sNumArray = [];
    displayEquation.appendChild(firstNum);
}

// Erase button function that erase each element from the 'screen'
function eraseFunc(){
    if(displayValue.textContent !== '' && displayEquation.lastChild == firstNum){
        return;
    }
    if (displayEquation.lastChild === secondNum){
        sNumArray.pop();
        secondNum.textContent = sNumArray.join('');
        if(secondNum.textContent === ''){
            displayEquation.removeChild(secondNum);
        }
    }
    else if(displayEquation.lastChild === operator){
        displayEquation.removeChild(operator);
    }
    else {
        fNumArray.pop();
        firstNum.textContent = fNumArray.join('');
    }
}

// The function for all the number buttons
function numFunc(num){
    if(displayValue.textContent !== '' && displayEquation.lastChild == firstNum){
        return;
    }
    if(displayEquation.lastChild === firstNum){
        if(fNumArray[0] === 0 && fNumArray[1] !==  '.'){
            fNumArray.pop();
        }
        for (let i = 0; i < 10; i++){
            if(i === num){
                fNumArray.push(i);
            }
        }
        
        firstNum.textContent = fNumArray.join('');
    }
    else {
        if(sNumArray[0] === 0 && sNumArray[1] !==  '.'){
            sNumArray.pop();
        }
        for (let i = 0; i < 10; i++){
            if(i === num){
                sNumArray.push(i);
            }
        }
        
        secondNum.textContent = sNumArray.join('');
        displayEquation.appendChild(secondNum);
    }
    
}

// Point button function. 
// Checks if the 'point' is already in the equation before adding into it
function pointFunc(){
    if(displayEquation.lastChild === firstNum){
        if(fNumArray.includes('.')){
            return;
        }
        if(fNumArray.length == 0){
            fNumArray[0] = 0;
        }

        fNumArray.push('.');
        firstNum.textContent = fNumArray.join('');
    }
    else {
        if(sNumArray.includes('.')){
            return;
        }
        if(sNumArray.length == 0){
            sNumArray[0] = 0;
        }
        
        sNumArray.push('.');
        secondNum.textContent = sNumArray.join('');
        displayEquation.appendChild(secondNum);
    }
}

// Percent button function that divides the current number by 100
function percentBtnFunc(){
    
    const fNum = parseFloat(fNumArray.join(''));
    const sNum = parseFloat(sNumArray.join(''));
    
    let numPercent;

    if(displayEquation.lastChild == firstNum){
        numPercent = fNum / 100;
        fNumArray = [+numPercent.toFixed(4)];
        firstNum.textContent = fNumArray;
    }
    else if(displayEquation.lastChild == secondNum){
        numPercent = sNum / 100;
        sNumArray = [+numPercent.toFixed(4)];
        secondNum.textContent = sNumArray;
    }
    
}

// Operator button function that
// displays the correct operation depending on the button clicked
 function operatorBtnFunc(button){
    if(displayEquation.lastChild == secondNum){
        equalFunc();
    }
    if(firstNum.textContent === ''){
        return;
    }
    
    if(button == addBtn) {
        operator.textContent = ' + ';
    }
    else if(button == subtractBtn) {
        operator.textContent  = ' - '; 
    }
    else if(button == multiplyBtn) {
        operator.textContent = ' \xD7 '; 
    }
    else if(button == divideBtn) {
        operator.textContent = ' \xF7 '; 
    }
    displayEquation.appendChild(operator);
 }

// Equal button function that operates the equation only if the equation is complete.
function equalFunc(){
    if(displayEquation.lastChild != secondNum){
        return;
    }
    const fNum = parseFloat(fNumArray.join(''));
    const sNum = parseFloat(sNumArray.join(''));
    operate(fNum, sNum);
}

// This function manipulates the dom that displays the 
// equation from the corresponding operator
function operate(num1, num2){
    if(operator.textContent === ' + '){
        answer = add(num1, num2);
    }
    else if(operator.textContent === ' - ') {
        answer = subtract(num1, num2);
        
    }
    else if (operator.textContent === ' \xD7 ') {
        answer = multiply(num1, num2);
        
    }
    else if (operator.textContent === ' \xF7 ') {
        answer = divide(num1, num2);
        if(num2 === 0){
            alert('You cant divide by zero!');
            return;
        }
    }

    const maxDecPlacesAns = +answer.toFixed(4); // limits the decimal places into 4
    const ansToStr = answer.toString(); // convert the answer into a string

    // Checks if the string-converted answer is a decimal number
    if(ansToStr.includes('.')){
        answer = maxDecPlacesAns;
    }
    const displayValueChild = document.createElement('div');
    displayValueChild.textContent = firstNum.textContent + 
    ' ' + operator.textContent + ' ' + secondNum.textContent + ' = ' + answer;
    displayValue.prepend(displayValueChild);
    displayEquation.textContent = '';
    fNumArray = [answer];
    firstNum.textContent =  fNumArray;
    displayEquation.appendChild(firstNum);
    sNumArray = [];
}

// The following functions is where all the math happens
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}