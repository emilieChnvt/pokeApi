const containerPokemon = document.querySelector(".containerPokemon");



let url = 'https://pokebuildapi.fr/api/v1/pokemon/limit/20'; //PAS TOUS AFFICHÉ CAR PAGE CHARGEAIT TROP LONGTEMPS

fetch(url)
 .then(response => response.json())
    .then(data => {
        displayPokemonsList(data);
        eventListener(data)
    });




function displayPokemonsList(data) {
    data.forEach((pokemon) => {
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
    let cardPokemonsDetails = `
                        <div class="card border-warning poke w-50 h-50">
                                <img src="${pokemon}" class="card-img-top w-100" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title text-warning  fs-3">${pokemon.name}</h5>
                                    <p class="card-text">Attack : ${pokemon.attack}</p>
                                    <p class="card-text">Defense : ${pokemon.defense}</p>
                                    <p class="card-text">Attack spéciale : ${pokemon.special_attack}</p>
                                    <p class="card-text">Defense spéciale: ${pokemon.special_defense}</p>
                                    <p class="card-text">Vitesse: ${pokemon.speed}</p>
                                    <a href="#" class="btn btn-warning seeMore">Go Back</a> 
                                </div>
                        
                        </div>`

    containerPokemon.innerHTML= cardPokemonsDetails;
}
function eventListener(data) {
    containerPokemon.addEventListener('click', (e) => {

        if(e.target.classList.contains('seeMore')) {
            const pokemonId = e.target.getAttribute('data-id'); // ajouté sur le bouton
            const selectedPokemon = data.filter((pokemon) => pokemon.id == pokemonId);
            console.log(selectedPokemon);
            if (selectedPokemon) displayPokemon(selectedPokemon);

        }


    })

}