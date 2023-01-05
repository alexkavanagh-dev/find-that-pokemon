// Const for all 151 first generation pokemon
const firstGenPokemonArray = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

// Create clone of the pokemon array so changes can be made without affecting the original
let pokemonArrayClone = [...firstGenPokemonArray];

// Global variables and common reused HTML elements
let livesLeft = 7;
let answer;
let pikachuBalloons = document.getElementById('balloons');
let trap = document.getElementById('trap');
let animationScreen = document.getElementById('animation-screen');
let winScreen = document.getElementById('win-screen');
let firstRowHTML = document.getElementById('first-row');
let secondRowHTML = document.getElementById('second-row');
let thirdRowHTML = document.getElementById('third-row');

const clickAudio = document.getElementById('click-audio');
const balloonPopAudio = document.getElementById('balloon-pop');
const pikachuFallAudio = document.getElementById('pikachu-fall');
const correctInputAudio = document.getElementById('correct-input-audio');
const scorePing = document.getElementById('score-ping');
// Wait for DOM to load and then create the input keyboard and start the main game
document.addEventListener("DOMContentLoaded", function() {

    createInputKeyboard();

    runGame();
});

/**
 * The main loop of the game, called when the DOM content is loaded
 */
function runGame() {
    
    pickPokemonFromArray();

    displayAnswerDashes();

    // Add event listener to the reset button to call resetGame()
    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener("click", function(){ resetGame(this); }); 
}

/**
 * Create the input qwerty keyboard with template literals and a for loop
 */
function createInputKeyboard() {
    
    let qwertyAlphabet = "QWERTYUIOPASDFGHJKLZXCVBNM'";
    let qwertyArray = Array.from(qwertyAlphabet);
    
    for (let i = 0; i < qwertyArray.length; i++) {
        
        if (i < 10) {
            firstRowHTML.innerHTML += `<button id='${qwertyArray[i]}' class='letter'>${qwertyArray[i]}</button>`;
        } else if (i < 19) {
            secondRowHTML.innerHTML += `<button id='${qwertyArray[i]}' class='letter'>${qwertyArray[i]}</button>`;
        } else {
            thirdRowHTML.innerHTML += `<button id='${qwertyArray[i]}' class='letter'>${qwertyArray[i]}</button>`;
        }
    } 

    // Get buttons from the input keyboard and add event listeners to them 
    let keyboardButtons = document.getElementsByClassName('letter');

    for (let button of keyboardButtons) {
        button.addEventListener("click", function(){ handleKeyboardInput(this); }); 
    }
}

function resetKeyboard() {

    firstRowHTML.innerHTML = "";
    secondRowHTML.innerHTML = "";
    thirdRowHTML.innerHTML = "";

    createInputKeyboard();
}

/**
 * Takes cloned pokemon array, generates a random number to pick an answer
 * then splices that answer from the array and returns the answer
 */
function pickPokemonFromArray() {

    if (pokemonArrayClone.length === 0){
        
        displayWinScreen();
    } else {

        let arrayNumber = Math.floor( Math.random() * pokemonArrayClone.length );
        answer = (pokemonArrayClone[arrayNumber]).toUpperCase();    
    
        pokemonArrayClone.splice(arrayNumber, 1);
    }

    console.log(answer);
}

/**
 * Displays a dash for each letter in the answer on the webpage
 */
function displayAnswerDashes() {

    let answerHTML = document.getElementById('answer-screen');

    answerHTML.innerHTML = "";

    for (let i = 0; i < answer.length; i++) {
        answerHTML.innerHTML += "<p class='answer-letter'>_</p>";
    }
}

/**
 * Disables the letter was just clicked and calls checkInput()
 * @param {*} input 
 */
function handleKeyboardInput(input) {

    input.style.color = "#28abfd";
    input.setAttribute("disabled", "");

    let isInputCorrect = checkInput(input);

    if (isInputCorrect) {

        correctInputAudio.play();

        let isFullNameGuessed = checkIfFullNameGuessed();

        if (isFullNameGuessed) {

        scorePing.play();
        incrementFound();
        disableInputKeyboard();

        setTimeout(() => {pickNextPokemon();}, 1000)
        }
    } else {

        balloonPopAudio.play();
        livesLeft--;
        pikachuBalloons.src = `assets/images/pikachu-balloon-${livesLeft}.webp`;
    }

    if (livesLeft === 0) {

        pikachuFallAudio.play();
        incrementTrapped();
        disableInputKeyboard();

        trap.src = "assets/images/trapped-pikachu.webp";
        pikachuBalloons.style.visibility = "hidden";

        setTimeout(() => {

            pickNextPokemon();
            trap.src = "assets/images/trap.webp";
            pikachuBalloons.style.visibility = "visible";
        }, 2000);
    }
}

/**
 * Checks if selected input is in answer and replaces dash(es) with letter(s)
 * @param {*} input 
 */
function checkInput(input) {

    let isInputCorrect = false; 

    let answerLettersHTML = document.getElementsByClassName('answer-letter');

    for (i = 0; i < answer.length; i++) {
        
        if (input.innerText === answer.charAt(i)) {

            isInputCorrect = true;
            answerLettersHTML[i].innerText = input.innerText;
        }
    }

    return isInputCorrect;
}

function disableInputKeyboard() {

    let keyboardButtons = document.getElementsByClassName('letter');

    for(button of keyboardButtons) {

        button.setAttribute("disabled", "");
    }
}

function checkIfFullNameGuessed() {

    let answerLettersHTML = document.getElementsByClassName('answer-letter');
    let isFullNameGuessed = true;

    for (letter of answerLettersHTML) {

        if (letter.innerHTML === '_') {

            isFullNameGuessed = false;
        }
    }

    return isFullNameGuessed;
}

function pickNextPokemon() {

    resetKeyboard();
    pickPokemonFromArray();
    displayAnswerDashes();
    livesLeft = 7;
    pikachuBalloons.src = `assets/images/pikachu-balloon-${livesLeft}.webp`;
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

    clickAudio.play();
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