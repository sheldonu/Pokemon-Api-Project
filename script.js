// get dom elements
const resultElement = document.getElementById("result");

const pokemonImageElement = document.getElementById("pokemonImage");

const optionsMain = document.getElementById("options");

const pointsElement = document.getElementById("pointsValue");

const totalCount = document.getElementById("totalCount");

const page = document.getElementsByClassName("main");

const loadingMain = document.getElementById("loadingMain");


// keep track of what pokemon have already been used
let usedPokemonIds = [];
let count = 0;
let points = 0;
let showLoading = false;


// function to fetch one pokemon with ID
async function fetchPokemonById(id) {
    showLoading = true;
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


// function of question with options
async function loadQuestionWithOptions() {
    if (showLoading) {
        showLoadingWindow();
        hidePuzzleWindow();
    }
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

        if (options.length === 4) {
            showLoading = false;
        }
    }

    shuffleArray(options);

    resultElement.textContent = "Who's that pokemon?";
    pokemonImageElement.src = pokemon.sprites.other.dream_world.front_default;

    optionsMain.innerHTML = "";
    options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = (event) => checkAnswer(option === pokemon.name, event);
        optionsMain.appendChild(button);
    });

    if (!showLoading) {
    hideLoadingWindow();
    showPuzzleWindow();
    }
}

// call the inital load
loadQuestionWithOptions();

// function to check the answer
function checkAnswer(isCorrect, event) {
    const selectedButton = document.querySelector(".selected");

    if (selectedButton) {
        return;
    }

    event.target.classList.add("selected");
    count++;
    totalCount.textContent = count;

    if (isCorrect) {
        displayResult("Correct!");
        points++;
        pointsElement.textContent = points;
        event.target.classList.add("correct")
    } else {
        displayResult("Oof nope... try again!");
        event.target.classList.add("wrong")
    }

    // load the next question
    setTimeout(() => {
        showLoading = true;
        loadQuestionWithOptions();
    }, 1000);
}

// randomize the pokemon ID
function getRandomPokemonId() {
    return Math.floor(Math.random() * 151) + 1;
}


// function to shuffle the array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function displayResult(result) {
    resultElement.textContent = result;
}

// hide the loading icon
function hideLoadingWindow() {
    loadingMain.classList.add("hide");
}

function showLoadingWindow() {
    page[0].classList.remove("show");
    loadingMain.classList.remove("hide")
    loadingMain.classList.add("show")
}

function showPuzzleWindow() {
    loadingMain.classList.remove("show");
    page.classList[0].remove("hide")
    page.classList[0].add("show")
}

function hidePuzzleWindow() {
    page[0].classList.add("hide");
}