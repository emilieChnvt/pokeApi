const containerPokemon = document.querySelector(".containerPokemon");


let url = 'https://pokebuildapi.fr/api/v1/pokemon/limit/20'; //PAS TOUS AFFICHÉ CAR PAGE CHARGEAIT TROP LONGTEMPS

fetch(url)
 .then(response => response.json())
    .then(data => {
        data.forEach((pokemon) => {
            let cardsPokemon = `
                <div class="col-4 ">
                    <div class="card  border border-warning poke  ">
                        <img src="${pokemon.image}" class="card-img-top w-100" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-warning  fs-3">${pokemon.name}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-warning seeMore" data-id="${pokemon.id}">See more</a> 
                        </div>
                    </div>
                    
                </div>`
            containerPokemon.innerHTML += cardsPokemon
    })
        containerPokemon.addEventListener('click', (e) => {
            if(e.target.classList.contains('seeMore')) {
                const pokemonId = e.target.getAttribute('data-id'); // ajouté sur le bouton
                const selectedPokemon = data.filter((pokemon) => pokemon.id == pokemonId);
                console.log(selectedPokemon);
                if(selectedPokemon === 0) retun;
                const pokemon = selectedPokemon[0];

                let cardPokemonsDetails = `
                        <div class="card border-warning poke w-50">
                                <img src="${pokemon.image}" class="card-img-top w-100" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title text-warning  fs-3">${pokemon.name}</h5>
                                    <p class="card-text">Attack : ${pokemon.stats.attack}</p>
                                    <p class="card-text">Defense : ${pokemon.stats.defense}</p>
                                    <p class="card-text">Attack spéciale : ${pokemon.stats.special_attack}</p>
                                    <p class="card-text">Defense spéciale: ${pokemon.stats.special_defense}</p>
                                    <p class="card-text">Vitesse: ${pokemon.stats.speed}</p>
                                    <a href="#" class="btn btn-warning seeMore">Go Back</a> 
                                </div>
                        
                        </div>`

containerPokemon.innerHTML = cardPokemonsDetails;
            }
        })

    })

