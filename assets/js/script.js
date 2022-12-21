document.addEventListener("DOMContentLoaded", function() {

    createInputKeyboard();

    let keyboardButtons = document.getElementsByClassName('letter');

    for (let button of keyboardButtons) {
        button.addEventListener("click", handleKeyboardInput);
    }

    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener("click", handleKeyboardInput)

})

function createInputKeyboard() {

    let qwertyAlphabet = "QWERTYUIOPASDFGHJKLZXCVBNM'";
    let qwertyArray = Array.from(qwertyAlphabet);

    let firstRowHTML = document.getElementById('first-row');
    let secondRowHTML = document.getElementById('second-row');
    let thirdRowHTML = document.getElementById('third-row');

    for (let i = 0; i < qwertyArray.length; i++) {

        if (i < 10) {
            firstRowHTML.innerHTML += `<button id='${qwertyArray[i]}' class='letter'>${qwertyArray[i]}</button>`;
        } else if (i < 19) {
            secondRowHTML.innerHTML += `<button id='${qwertyArray[i]}' class='letter'>${qwertyArray[i]}</button>`;
        } else {
            thirdRowHTML.innerHTML += `<button id='${qwertyArray[i]}' class='letter'>${qwertyArray[i]}</button>`;
        }
    }  
};

function handleKeyboardInput(e) {
    e.preventDefault();

    console.log(this.innerText + " button works!");
}

function resetGame(e) {
    e.preventDefault();

    console.log(this.innerText + " button works!");
}