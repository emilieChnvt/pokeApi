const containerPokemon = document.querySelector(".containerPokemon");
const containerButton = document.querySelector(".containerButton");
const input = document.querySelector("#searchInput");
const iconHouse = document.querySelector(".iconHouse");
const buttonSearch = document.querySelector(".search");

let pokemonListArray =[]


let apiPoke = 'https://pokeapi.co/api/v2/pokemon/'; //PAS TOUS AFFICHÉ CAR PAGE CHARGEAIT TROP LONGTEMPS

function initializePage(){
    fetch(apiPoke)
    .then(response => response.json())
    .then(data => {
        pokemonListArray = data.results;

        displayButtonAbilities();
        displayAllPokemons(pokemonListArray);


    });
}
initializePage()



iconHouse.addEventListener('click', (e)=>{
    e.preventDefault();
    displayAllPokemons(pokemonListArray);
})

function searchPokemon() {
    const inputValue = input.value.trim().toLowerCase();
    const foundPokemon= pokemonListArray.find(pokemon => pokemon.name.toLowerCase() === inputValue);
    console.log(pokemonListArray)
            if(foundPokemon) {
                fetch(foundPokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        containerPokemon.innerHTML = `
                            <div class="card border border-warning" style="width: 18rem;">
                                <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}">
                                <div class="card-body">
                                    <h5 class="card-title text-uppercase text-warning">${pokemonData.name}</h5>
                                    <p class="card-text">Weight: ${pokemonData.weight} Kg</p>
                                    <p class="card-text">Height: ${pokemonData.height} m</p>
                                    <ul class="stats">
                                        ${pokemonData.stats.map(stat => `<li class="pokemonStat">${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                                    </ul>
                                    <button class="btn btn-warning goBack">Go Back</button>
                                </div>
                            </div>`;
                        goBackListPokemons(pokemonListArray);
                    })
            }else{
                alert(`there is no pokemon called ${input.value.toLowerCase()}`);
                input.value='';
            }

}
buttonSearch.addEventListener('click',searchPokemon);


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

    const btnSeeMore = containerPokemon.querySelectorAll('.seeMore');

    btnSeeMore.forEach((button) => {
        button.addEventListener("click", function() {
            let pokemonUrl = this.getAttribute("data-url");
            fetch(pokemonUrl)
                .then(response => response.json())
                .then(data => {

            let pokemonStats = data.stats.map(stat => `<li class="pokemonStat">${stat.stat.name} : ${stat.base_stat}</li>`).join('');


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

                displayPokemonsWithAbilities(pokemonsWithAbilities );
            })
}
function displayPokemonsWithAbilities(pokemons ) {
    containerPokemon.innerHTML = ``
    pokemons.forEach((pokemon) => {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(data => {

                let pokemonCard = `
                            <div class="card border border-warning" style="width: 18rem;">
                                <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
                                <div class="card-body">
                                        <h5 class="card-title">${data.name}</h5>
                                        <p class="card-text">${data.weight} Kg</p>
                                        <a href="#" class="btn btn-warning seeMore" data-url="${pokemon.url}">See more</a>
                                </div>
                            </div>`

                containerPokemon.innerHTML += pokemonCard;

                    displayPokemonAfterButtonCardClicked(pokemons);

            })

        goBackListPokemons(pokemons);
    })

}