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
    const pokemon = await fetchPokemonById(1);
    console.log(pokemon);
}

// call the test function
testFetch();

