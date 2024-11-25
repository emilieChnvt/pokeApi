const containerPokemon = document.querySelector(".containerPokemon");
const containerButton = document.querySelector(".containerButton");



let url = 'https://pokeapi.co/api/v2/pokemon/'; //PAS TOUS AFFICHÉ CAR PAGE CHARGEAIT TROP LONGTEMPS

fetch(url)
 .then(response => response.json())
    .then(data => {
        const pokemonListArray = data.results;
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

    });



