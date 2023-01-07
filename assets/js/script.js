// This array was copied from https://gist.github.com/octalmage/6936761
// Const for all 151 first generation pokemon
const firstGenPokemonArray = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr.Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

// Create clone of above array to allow answers to be removed from clone array without affecting the original array
let pokemonArrayClone = [...firstGenPokemonArray];

// Global variables
let livesLeft = 7;
let answer;

// Global common reused HTML elements
const pikachuBalloons = document.getElementById('balloons');
const trap = document.getElementById('trap');
const animationScreen = document.getElementById('animation-screen');
const winScreen = document.getElementById('win-screen');
const firstRowHTML = document.getElementById('first-row');
const secondRowHTML = document.getElementById('second-row');
const thirdRowHTML = document.getElementById('third-row');

// Audio elements
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
    
    let qwertyAlphabet = "QWERTYUIOPASDFGHJKLZXCVBNM.'";
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

    // Get buttons from the input keyboard and add event listeners to them to call handleKeyboardInput
    let keyboardButtons = document.getElementsByClassName('letter');

    for (let button of keyboardButtons) {
        button.addEventListener("click", function(){ handleKeyboardInput(this); }); 
    }
}

/**
 * Empties innerHTML of the input keyboard before recreating it with createInputKeyboard()
 */
function resetKeyboard() {

    firstRowHTML.innerHTML = "";
    secondRowHTML.innerHTML = "";
    thirdRowHTML.innerHTML = "";

    createInputKeyboard();
}

/**
 * Checks if pokemonArrayClone is empty before picking a new answer.
 * Otherwise displayWinScreen will be called and the game is over.
 * Console logs the answer when picked to make testing easier
 */
function pickPokemonFromArray() {

    if (pokemonArrayClone.length === 0){
        
        displayWinScreen();
    } else {

        // Generate random number using the length of the array left to pick an answer
        // and then splice the answer out so it cannot be picked again
        let arrayNumber = Math.floor( Math.random() * pokemonArrayClone.length );
        answer = (pokemonArrayClone[arrayNumber]).toUpperCase();    
    
        pokemonArrayClone.splice(arrayNumber, 1);
        console.log(answer);
    }
}

/**
 * Display a dash for each letter in the answer on that answer screen
 */
function displayAnswerDashes() {

    let answerHTML = document.getElementById('answer-screen');

    answerHTML.innerHTML = "";

    for (let i = 0; i < answer.length; i++) {
        answerHTML.innerHTML += "<p class='answer-letter'>_</p>";
    }
}

/**
 * Takes in the letter clicked and uses checkInput() function to check if it is in the answer.
 * Then continues the game accordingly depending on if the letter was correct or incorrect
 * @param {*} input 
 */
function handleKeyboardInput(input) {

    // Disable the selected letter and blanks it out
    input.style.color = "#28abfd";
    input.setAttribute("disabled", "");

    let isInputCorrect = checkInput(input);
    
    // If input was correct, plays affirming ping and checks if the full name has been guessed
    if (isInputCorrect) {

        correctInputAudio.play();

        let isFullNameGuessed = checkIfFullNameGuessed();

        // If the full name has been guessed, plays an affirming ping, increments score, disables keyboard
        // and after 1 second will call pickNextPokemon() to continue the game
        if (isFullNameGuessed) {

        scorePing.play();
        incrementFound();
        disableInputKeyboard();

        setTimeout(() => {pickNextPokemon();}, 1000)
        }
    }
    // if input was incorrect, plays a balloon pop sound, decrements lives left
    // and removes a balloon from pikachu 
    else if (!isInputCorrect) {

        balloonPopAudio.play();
        livesLeft--;
        pikachuBalloons.src = `assets/images/pikachu-balloon-${livesLeft}.webp`;

        // If all lives are gone, pikachu falling audio plays, trapped score is incremented, keyboard is disabled
        // pikachu is shown trapped in the cage for 2 seconds before a new pokemon is selected
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
    // Alert user and throw an error if isInputCorrect is not returned as a boolean
    else {

        alert(`isInputCorrect returned as: ${isInputCorrect}`);
        throw `isInputCorrect should only be a boolean value. Aborting!`;
    }
}

/**
 * Checks if the letter clicked is in the answer
 * Replaces dashes on answer screen with the letter if needed
 * @returns boolean 'isInputCorrect' 
 * @param {*} input 
 */
function checkInput(input) {

    let isInputCorrect = false; 

    let answerLettersHTML = document.getElementsByClassName('answer-letter');

    for (let i = 0; i < answer.length; i++) {
        
        if (input.innerText === answer.charAt(i)) {

            isInputCorrect = true;
            answerLettersHTML[i].innerText = input.innerText;
        }
    }

    return isInputCorrect;
}

/**
 * Gets keyboard buttons in HTML and disables them from being clicked
 */
function disableInputKeyboard() {

    let keyboardButtons = document.getElementsByClassName('letter');

    for(let button of keyboardButtons) {

        button.setAttribute("disabled", "");
    }
}

/**
 * Checks if all the letters in the answer have been guessed
 * @returns boolean isFullNameGuessed
 */
function checkIfFullNameGuessed() {

    let answerLettersHTML = document.getElementsByClassName('answer-letter');
    let isFullNameGuessed = true;

    for (let letter of answerLettersHTML) {

        if (letter.innerHTML === '_') {

            isFullNameGuessed = false;
        }
    }

    return isFullNameGuessed;
}

/**
 * Calls resetKeyboard(), pickPokemonFromArray() and displayAnswerDashes()
 * then resets livesLeft back to 7 and the pikachu balloon image back to 7 balloons
 */
function pickNextPokemon() {

    resetKeyboard();
    pickPokemonFromArray();
    displayAnswerDashes();
    livesLeft = 7;
    pikachuBalloons.src = `assets/images/pikachu-balloon-${livesLeft}.webp`;
}

/**
 * Gets the old 'pokemon found' score from HTML and increments it by one
 */
function incrementFound() {

    let oldScoreFound = parseInt(document.getElementById('score-found').innerText);
    document.getElementById("score-found").innerText = ++oldScoreFound;
}

/**
 * Gets the old 'pikachus trapped' score from HTML and increments it by one
 */
function incrementTrapped() {

    let oldScoreTrapped = parseInt(document.getElementById('score-trapped').innerText);
    document.getElementById("score-trapped").innerText = ++oldScoreTrapped;
}

/**
 * Resets all variables, HTML elements and pokemonArrayClone back to their 
 * original state and starts the game over
 */
function resetGame() {

    clickAudio.play();
    answer = "";
    pokemonArrayClone = [...firstGenPokemonArray];
    document.getElementById("score-found").innerText = 0;
    document.getElementById("score-trapped").innerText = 0;
    animationScreen.style.display = "grid";
    winScreen.style.display = "none";

    pickNextPokemon();
}

/**
 * Disables keyboard input and displays the end game screen where the
 * animation screen is
 */
function displayWinScreen() {

    disableInputKeyboard();

    let scoreFound = document.getElementById('score-found');

    document.getElementById("final-score").innerText = scoreFound.innerText;
    animationScreen.style.display = "none";
    winScreen.style.display = "block";
}