document.addEventListener("DOMContentLoaded", function() {

    createInputKeyboard();

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
    
}