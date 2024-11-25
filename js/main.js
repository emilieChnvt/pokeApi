const containerPokemon = document.querySelector(".containerPokemon");
const containerButton = document.querySelector(".containerButton");



let apiPoke = 'https://pokeapi.co/api/v2/pokemon/'; //PAS TOUS AFFICHÉ CAR PAGE CHARGEAIT TROP LONGTEMPS

fetch(apiPoke)
 .then(response => response.json())
    .then(data => {
        const pokemonListArray = data.results;
        displayButtonAbilities();
        displayAllPokemons(pokemonListArray);



    });


function displayAllPokemons(pokemonListArray) {
    pokemonListArray.forEach((pokemon) => {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(data => {

                let pokemonCard = `
                            <div class="card" style="width: 18rem;">
                                <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
                                <div class="card-body">
                                        <h5 class="card-title">${data.name}</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>`
                containerPokemon.innerHTML += pokemonCard;

            })


    })

}


function displayButtonAbilities() {
    fetch('https://pokeapi.co/api/v2/ability/')
        .then(response => response.json())
        .then(data => {

            const listOfPokemonsAbilities = data.results;
            listOfPokemonsAbilities.forEach((ability) => {
                let buttonAbility = document.createElement("button");
                buttonAbility.textContent = ability.name;
                buttonAbility.classList.add("w-10");
                containerButton.appendChild(buttonAbility);

                buttonAbility.addEventListener('click',()=>buttonAbilitiesClicked(ability.url));
            })


        })
}

function buttonAbilitiesClicked(abilityUrl) {

        fetch(abilityUrl)//recupère les ability une par une
            .then(response => response.json())
            .then(data => {

                let pokemonsWithAbilities = data.pokemon.map(ability => ability.pokemon) // pour trouver pokemon avec ability du boutton
                console.log(pokemonsWithAbilities);
                displayPokemonsWithAbilities(pokemonsWithAbilities);
            })
}
function displayPokemonsWithAbilities(pokemons){
    pokemons.forEach((pokemon) => {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(data => {

                let pokemonCard = `
                            <div class="card" style="width: 18rem;">
                                <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
                                <div class="card-body">
                                        <h5 class="card-title">${data.name}</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>`
                containerPokemon.innerHTML += pokemonCard;

            })


    })

}