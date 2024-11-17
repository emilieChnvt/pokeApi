 let url = 'https://pokebuildapi.fr/api/v1/pokemon';

fetch(url)
 .then(response => response.json())
.then(json => { console.log(json); });