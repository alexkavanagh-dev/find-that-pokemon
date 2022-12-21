document.addEventListener("DOMContentLoaded", function() {

    let firstGenPokemonArray = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

    createInputKeyboard();

    runGame(firstGenPokemonArray);
});

function runGame(pokemonArray) {
    
    let answer = pickPokemonFromArray(pokemonArray);
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

function pickPokemonFromArray(pokemonArray) {

    let arrayNumber = Math.floor( Math.random() * pokemonArray.length );
    let answer = pokemonArray[arrayNumber];    

    pokemonArray.splice(arrayNumber, 1);

    return answer;
}

function displayAnswerDashes(answer) {

    let answerHTML = document.getElementById('answer');

    for (let i = 0; i < answer.length; i++) {
        answerHTML.innerHTML += "_ ";
    }
}

function handleKeyboardInput(input, answer) {

    console.log(answer);
    console.log(input.innerText + " button works!");

    input.style.color = "#28abfd";
    input.setAttribute("disabled", "");

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