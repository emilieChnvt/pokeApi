const containerPokemon = document.querySelector(".containerPokemon");



let url = 'https://pokebuildapi.fr/api/v1/pokemon';

fetch(url)
 .then(response => response.json())
    .then(data => {
        data.forEach((pokemon) => {
            console.log(pokemon)})
    });