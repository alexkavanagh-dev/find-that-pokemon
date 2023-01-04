// Global const containing all 151 first generation pokemon that gets passed to the runGame() function
// Having this be passed to runGame() will make it easier in future to add more generations that a user could select from and have that pass to runGame() instead
const firstGenPokemonArray = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

let livesLeft = 7;
let answer;
let pikachuBalloons = document.getElementById('balloons');
let trap = document.getElementById('trap');
let animationScreen = document.getElementById('animation-screen');
let winScreen = document.getElementById('win-screen');

// Create clone of the pokemon array so changes can be made without affecting the original
let pokemonArrayClone = [...firstGenPokemonArray];

// When the DOM content loads, call createInputKeyboard() and then runGame() with the pokemon array as an argument
document.addEventListener("DOMContentLoaded", function() {

    createInputKeyboard();

    runGame(firstGenPokemonArray);
});

/**
 * The main loop of the game, called when the DOM content is loaded
 * @param {*} pokemonArray 
 */
function runGame() {
    
    pickPokemonFromArray();

    displayAnswerDashes();

    // Get buttons from the input keyboard and add event listeners to them 
    let keyboardButtons = document.getElementsByClassName('letter');

    for (let button of keyboardButtons) {
        button.addEventListener("click", function(){ handleKeyboardInput(this); }); 
    }

    // Add event listener to the reset button
    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener("click", function(){ resetGame(this); }); 
 
}

/**
 * Create the input qwerty keyboard with template literals and a for loop
 */
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

function resetKeyboard() {

    let firstRowHTML = document.getElementById('first-row');
    let secondRowHTML = document.getElementById('second-row');
    let thirdRowHTML = document.getElementById('third-row');

    firstRowHTML.innerHTML = "";
    secondRowHTML.innerHTML = "";
    thirdRowHTML.innerHTML = "";

    createInputKeyboard();

    // Get buttons from the input keyboard and add event listeners to them 
    let keyboardButtons = document.getElementsByClassName('letter');

    for (let button of keyboardButtons) {
        button.addEventListener("click", function(){ handleKeyboardInput(this); }); 
    }
}

/**
 * Takes cloned pokemon array, generates a random number to pick an answer
 * then splices that answer from the array and returns the answer
 * @param {*} pokemonArrayClone 
 * @returns answer
 */
function pickPokemonFromArray() {

    if (pokemonArrayClone.length === 0){
        
        displayWinScreen();
    } else {

        let arrayNumber = Math.floor( Math.random() * pokemonArrayClone.length );
        answer = (pokemonArrayClone[arrayNumber]).toUpperCase();    
    
        pokemonArrayClone.splice(arrayNumber, 1);
    }
}

/**
 * Displays a dash for each letter in the answer on the webpage
 * @param {*} answer 
 */
function displayAnswerDashes() {

    let answerHTML = document.getElementById('answer-screen');

    answerHTML.innerHTML = "";

    for (let i = 0; i < answer.length; i++) {
        answerHTML.innerHTML += "<p class='answer-letter'>_</p>";
    }
}

/**
 * Disables whichever letter was just clicked and calls checkInput()
 * @param {*} input 
 * @param {*} answer 
 */
function handleKeyboardInput(input) {

    console.log(answer);
    console.log(input.innerText + " button works!");

    input.style.color = "#28abfd";
    input.setAttribute("disabled", "");

    let correctGuess = checkInput(input);

    if (!correctGuess) {

        livesLeft--;
        pikachuBalloons.src = `assets/images/pikachu-balloon-${livesLeft}.webp`;
    } else {

        let answerLettersHTML = document.getElementsByClassName('answer-letter');
        let nameGuessed = true;

        for (letter of answerLettersHTML) {

            if (letter.innerHTML === '_') {

                nameGuessed = false;
            }
        }

        if (nameGuessed) {

        incrementFound();

        setTimeout(() => {

            resetKeyboard();
            pickPokemonFromArray();
            displayAnswerDashes();
            livesLeft = 7;
            pikachuBalloons.src = `assets/images/pikachu-balloon-${livesLeft}.webp`;
        }, 1000)
        }
    }

    if (livesLeft === 0) {

        let keyboardButtons = document.getElementsByClassName('letter');

        for(button of keyboardButtons) {

            button.setAttribute("disabled", "");
        }

        incrementTrapped();
        pickPokemonFromArray();

        trap.src = "assets/images/trapped-pikachu.webp";
        pikachuBalloons.style.visibility = "hidden";

        setTimeout(() => {

            resetKeyboard();
            displayAnswerDashes();
            livesLeft = 7;
            pikachuBalloons.src = `assets/images/pikachu-balloon-${livesLeft}.webp`;
            trap.src = "assets/images/trap.webp";
            pikachuBalloons.style.visibility = "visible";
        }, 2000);
    }
}

/**
 * Checks if selected input is in answer and replaces dash(es) with letter(s)
 * @param {*} input 
 * @param {*} answer 
 */
function checkInput(input) {

    let correctGuess = false; 

    let answerLettersHTML = document.getElementsByClassName('answer-letter');

    for (i = 0; i < answer.length; i++) {
        
        if (input.innerText === answer.charAt(i)) {

            correctGuess = true;
            answerLettersHTML[i].innerText = input.innerText;
        }
    }

    return correctGuess;
    
}

/**
 * Increments pokemon found when a full answer is guessed correctly
 */
function incrementFound() {

    let oldScoreFound = parseInt(document.getElementById('score-found').innerText);
    document.getElementById("score-found").innerText = ++oldScoreFound;
}

/**
 * Increments 'trapped' score when user runs out of guesses
 */
function incrementTrapped() {

    let oldScoreTrapped = parseInt(document.getElementById('score-trapped').innerText);
    document.getElementById("score-trapped").innerText = ++oldScoreTrapped;
}

/**
 * Resets game when reset button is used
 * @param {*} e 
 */
function resetGame(input) {

    answer = "";
    livesLeft = 7;
    pokemonArrayClone = [...firstGenPokemonArray];
    pikachuBalloons.src = `assets/images/pikachu-balloon-${livesLeft}.webp`;
    document.getElementById("score-found").innerText = 0;
    document.getElementById("score-trapped").innerText = 0;
    animationScreen.style.display = "grid";
    winScreen.style.display = "none";

    pickPokemonFromArray();
    resetKeyboard();
    displayAnswerDashes();

    console.log(input.innerText + " button works!");
}

function displayWinScreen() {

    let keyboardButtons = document.getElementsByClassName('letter');

        for(button of keyboardButtons) {

            button.setAttribute("disabled", "");
        }

    let scoreFound = document.getElementById('score-found');

    document.getElementById("final-score").innerText = scoreFound.innerText;
    animationScreen.style.display = "none";
    winScreen.style.display = "block";
}