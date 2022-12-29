const firstGenPokemonArray = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

document.addEventListener("DOMContentLoaded", function() {

    createInputKeyboard();

    runGame(firstGenPokemonArray);
});

function runGame(pokemonArray) {

    let pokemonArrayClone = [...pokemonArray];
    
    let answer = (pickPokemonFromArray(pokemonArrayClone)).toUpperCase();
    displayAnswerDashes(answer);

    let keyboardButtons = document.getElementsByClassName('letter');

    for (let button of keyboardButtons) {
        button.addEventListener("click", function(){ handleKeyboardInput(this, answer); }); 
    }

    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener("click", function(){ handleKeyboardInput(this, answer); }); 

}

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

function pickPokemonFromArray(pokemonArrayClone) {

    let arrayNumber = Math.floor( Math.random() * pokemonArrayClone.length );
    let answer = pokemonArrayClone[arrayNumber];    

    pokemonArrayClone.splice(arrayNumber, 1);

    console.log(pokemonArray);
    console.log(pokemonArrayClone);

    return answer;
}

function displayAnswerDashes(answer) {

    let answerHTML = document.getElementById('answer-screen');

    for (let i = 0; i < answer.length; i++) {
        answerHTML.innerHTML += "<p class='answer-letter'>_</p>";
    }
}

function handleKeyboardInput(input, answer) {

    console.log(answer);
    console.log(input.innerText + " button works!");

    input.style.color = "#28abfd";
    input.setAttribute("disabled", "");

    checkInput(input, answer);

}

function checkInput(input, answer) {

    let answerLettersHTML = document.getElementsByClassName('answer-letter');

    for (i = 0; i < answer.length; i++) {
        
        if (input.innerText === answer.charAt(i)) {

            answerLettersHTML[i].innerText = input.innerText;
        }
    }
}

function incrementFound() {

    let oldScoreFound = parseInt(document.getElementById('score-found').innerText);
    document.getElementById("score-found").innerText = ++oldScoreFound;
}

function incrementTrapped() {

    let oldScoreTrapped = parseInt(document.getElementById('score-trapped').innerText);
    document.getElementById("score-trapped").innerText = ++oldScoreTrapped;
}

function resetGame(e) {
    e.preventDefault();

    console.log(this.innerText + " button works!");
}