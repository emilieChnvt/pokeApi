const containerPokemon = document.querySelector(".containerPokemon");
const containerButton = document.querySelector(".containerButton");
const inputValue = document.querySelector(".input").value;
console.log(inputValue);



let apiPoke = 'https://pokeapi.co/api/v2/pokemon/'; //PAS TOUS AFFICHÉ CAR PAGE CHARGEAIT TROP LONGTEMPS

fetch(apiPoke)
 .then(response => response.json())
    .then(data => {
        const pokemonListArray = data.results;
        displayButtonAbilities();
        displayAllPokemons(pokemonListArray);

    });
function searchPokemon() {
    let pokemonName = [];
    fetch(apiPoke)
        .then(response => response.json())
        .then(data => {
            pokemonName =data.results;
            console.log(pokemonName);


        })
}
searchPokemon();
function displayAllPokemons(pokemonListArray) {
    containerPokemon.innerHTML = ``

    pokemonListArray.forEach((pokemon) => {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(data => {
                let pokemonCard = `
                            <div class="card border border-warning" style="width: 18rem;">
                                <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
                                <div class="card-body">
                                        <h5 class="card-title text-uppercase text-warning">${data.name}</h5>
                                        <p class="card-text">weight : ${data.weight} Kg</p>
                                        <a href="#" class="btn btn-warning seeMore" data-url="${pokemon.url}" type="button">See More</a> 
                                </div>
                            </div>` // data-url pour récupérer url



                containerPokemon.innerHTML += pokemonCard;

                displayPokemonAfterButtonCardClicked(pokemonListArray);
            })


    })

}

function displayPokemonAfterButtonCardClicked(pokemonListArray) {

    let btnSeeMore = containerPokemon.querySelectorAll('.seeMore');

    btnSeeMore.forEach((button) => {
        button.addEventListener("click", function() {
            let pokemonUrl = this.getAttribute("data-url");
            fetch(pokemonUrl)

                .then(response => response.json())
                .then(data => {
                    console.log(pokemonUrl);
            let pokemonStats = data.stats.map(stat => `<li class="pokemonStat">${stat.stat.name} : ${stat.base_stat}</li>`).join('');
            console.log(pokemonStats);

                    let pokemonCard = `
                            <div class="card border border-warning" style="width: 18rem;">
                                <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
                                <div class="card-body">
                                        <h5 class="card-title">${data.name}</h5>
                                        <p class="card-text">${pokemonStats}</p>
                                        <button class="goBack bg-warning border border-warning p-2 rounded-2
                                        ">Go Back</button>
                                        
                                </div>
                            </div>` // data-url pour récupérer url

                    containerPokemon.innerHTML = pokemonCard;
                    goBackListPokemons(pokemonListArray)
                }
        )
        })
    })

}
function goBackListPokemons(pokemonListArray) {
    let goBackButton = document.querySelectorAll(".goBack");
    goBackButton.forEach((goBack) => {
        goBack.addEventListener("click", ()=> {

            displayAllPokemons(pokemonListArray)
        })
    });

}

function displayButtonAbilities(pokemonListArray) {
    fetch('https://pokeapi.co/api/v2/ability/')
        .then(response => response.json())
        .then(data => {
            const listOfPokemonsAbilities = data.results;
            listOfPokemonsAbilities.forEach((ability) => {
                let buttonAbility = document.createElement("button");
                buttonAbility.textContent = ability.name;
                buttonAbility.classList.add("btnAbility");
                containerButton.appendChild(buttonAbility);

                buttonAbility.addEventListener('click',()=>buttonAbilitiesClicked(ability.url, pokemonListArray));
            })


        })
}

function buttonAbilitiesClicked(abilityUrl, pokemonListArray) {
    containerPokemon.innerHTML = ``

    fetch(abilityUrl)//recupère les ability une par une
            .then(response => response.json())
            .then(data => {
                let pokemonsWithAbilities = data.pokemon.map(ability => ability.pokemon) // pour trouver pokemon avec ability du boutton

                displayPokemonsWithAbilities(pokemonsWithAbilities, pokemonListArray);
            })
}
function displayPokemonsWithAbilities(pokemons, pokemonListArray) {
    containerPokemon.innerHTML = ``
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
                                        <a href="#" class="btn btn-warning seeMore">See more</a>
                                </div>
                            </div>`

                containerPokemon.innerHTML += pokemonCard;
                setTimeout(() => {
                    displayPokemonAfterButtonCardClicked(pokemonListArray);
                }, 100); // Small delay to ensure all buttons are rendered
            })


    })
goBackListPokemons(pokemonListArray);
}