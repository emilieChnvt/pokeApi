const containerPokemon = document.querySelector(".containerPokemon");



let url = 'https://pokebuildapi.fr/api/v1/pokemon';

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
                            <a href="#" class="btn btn-primary seeMore">see more</a>
                        </div>
                    </div>
                    
                </div>`
            containerPokemon.innerHTML += cardPokemon
    })
        const seeMores= document.querySelectorAll(".seeMore");
        seeMores.forEach(button=>{
            button.addEventListener('click', e => {
                fetch(url)
                    .then(response => response.json())
                    .then(data => console.log(data.id))
            })
        });

    })

