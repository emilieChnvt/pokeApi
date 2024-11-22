const containerPokemon = document.querySelector(".containerPokemon");
const containerButton = document.querySelector(".containerButton");



let url = 'https://pokeapi.co/api/v2/pokemon/'; //PAS TOUS AFFICHÉ CAR PAGE CHARGEAIT TROP LONGTEMPS

fetch(url)
 .then(response => response.json())
    .then(data => {
        const pokemonListArray = data.results;
        displayPokemonsList(pokemonListArray);
        eventListener(pokemonListArray)
    });
fetch('https://pokeapi.co/api/v2/ability/')
    .then(response => response.json())
    .then(data => {
        displayButtonAbility(data)

    })

function displayButtonAbility(data){
    letPokemonAbilityList = data.results;
    letPokemonAbilityList.forEach((ability) => {
        console.log(ability);
        let buttonAbility = document.createElement("button");
        buttonAbility.textContent = ability.name;
        containerButton.appendChild(buttonAbility);
    })
}

function displayPokemonsList(pokemonListArray) {
    pokemonListArray.forEach((pokemon) => {
    let cardsPokemon = `
                <div class="col-4 ">
                    <div class="card  border border-warning poke  ">
                        <img src="${pokemon.image}" class="card-img-top w-100" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-warning  fs-3">${pokemon.name}</h5>
                            <p class="card-text">There is no description of Pokemons</p>
                            <a href="#" class="btn btn-warning seeMore" data-id="${pokemon.id}">See more</a> 
                        </div>
                    </div>
                    
                </div>`
    containerPokemon.innerHTML += cardsPokemon
})}
function displayPokemon(pokemon) {
    console.log(pokemon);
    let cardPokemonsDetails = `
                        <div class="card border-warning poke w-50 h-50">
                                <img src="${pokemon.image}" class="card-img-top w-100" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title text-warning  fs-3">${pokemon.name}</h5>
                                    <p class="card-text">Attack : ${pokemon.stats.attack}</p>
                                    <p class="card-text">Defense : ${pokemon.stats.defense}</p>
                                    <p class="card-text">Attack spéciale : ${pokemon.stats.special_attack}</p>
                                    <p class="card-text">Defense spéciale: ${pokemon.stats.special_defense}</p>
                                    <p class="card-text">Vitesse: ${pokemon.stats.speed}</p>
                                    <a href="#" class="btn btn-warning seeMore goBack">Go Back</a> 
                                </div>
                        
                        </div>`

    containerPokemon.innerHTML= cardPokemonsDetails;
}
function eventListener(pokemonListArray) {
    containerPokemon.addEventListener('click', (e) => {

        if(e.target.classList.contains('seeMore')) {
            const pokemonId = e.target.getAttribute('data-id'); // ajouté sur le bouton
            const selectedPokemon = pokemonListArray.filter((pokemon) => pokemon.id == pokemonId)[0]; // sans [0] c'est un tableau
            console.log(selectedPokemon);
            if (selectedPokemon) displayPokemon(selectedPokemon);

        }
        if(e.target.classList.contains('goBack')) {
            containerPokemon.innerHTML = '';
            displayPokemonsList(pokemonListArray);






        }


    })

}