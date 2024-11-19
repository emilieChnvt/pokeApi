const containerPokemon = document.querySelector(".containerPokemon");



let url = 'https://pokebuildapi.fr/api/v1/pokemon/limit/20';

fetch(url)
 .then(response => response.json())
    .then(data => {
        data.forEach((pokemon) => {
            let cardPokemon = `
                <div class="col-3">
                    <div class="card poke w-100 h-100">
                        <img src="${pokemon.image}" class="card-img-top w-100" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${pokemon.name}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary seeMore" data-id="${pokemon.id}">see more</a> 
                        </div>
                    </div>
                    
                </div>`
            containerPokemon.innerHTML += cardPokemon
    })
        const seeMores= document.querySelectorAll(".seeMore");
        seeMores.forEach(button=>{
            button.addEventListener('click', e => {

                const pokemonId = button.getAttribute('data-id');
                console.log(pokemonId);
                window.location.href = `https://pokebuildapi.fr/api/v1/pokemon/id=${pokemonId}`//pour changer de page
            })
        });

    })

