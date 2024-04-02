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
        
    }
}


// keep track of what pokemon have already been used
let usedPokemonIds = [];