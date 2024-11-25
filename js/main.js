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
                    console.log(data);
                })
        })

    });



