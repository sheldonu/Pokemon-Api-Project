// get dom elements
const resultElement = document.getElementById("result");

const pokemonImageElement = document.getElementById("pokemonImage");

const optionsMain = document.getElementById("options");

const pointsElement = document.getElementById("pointsValue");

const totalCount = document.getElementById("totalCount");

const loadingMain = document.getElementById("loadingMain");


// function to fetch one pokemon with ID
async function fetchPokemonById(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
}


// test function
async function testFetch() {
    const pokemon = await fetchPokemonById(getRandomPokemonId());
    console.log(pokemon);
}

// call the test function
testFetch();


// randomize the pokemon ID
function getRandomPokemonId() {
    return Math.floor(Math.random() * 151) + 1;
}

// keep track of what pokemon have already been used
let usedPokemonIds = [];

// function of question with options
async function loadQuestionWithOptions() {
    let pokemonId = getRandomPokemonId();
    while (usedPokemonIds.includes(pokemonId)) {
        pokemonId = getRandomPokemonId();
    }

    usedPokemonIds.push(pokemonId);
    const pokemon = await fetchPokemonById(pokemonId);

    const options = [pokemon.name];
    const optionsIds = [pokemon.id];

    while (options.length < 4) {
        let randomPokemonId = getRandomPokemonId();
        while (optionsIds.includes(randomPokemonId)) {
            randomPokemonId = getRandomPokemonId();
        }
        optionsIds.push(randomPokemonId);

        const randomPokemon = await fetchPokemonById(randomPokemonId);
        const randomOption = randomPokemon.name;
        options.push(randomOption);

        console.log(options);
        console.log(optionsIds);
    }

    shuffleArray(options);

    resultElement.textContent = "Who's that pokemon?";
    pokemonImageElement.src = pokemon.sprites.other.dream_world.front_default;

    optionsMain.innerHTML = "";
    options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = (event) => checkAnswer();
        optionsMain.appendChild(button);
    });
}

// call the inital load
loadQuestionWithOptions();

// function to shuffle the array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}