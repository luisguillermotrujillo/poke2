// A partir de la API de Pokémon: https://pokeapi.co/
// Crea un pokédex, es decir una página web donde puedas consultar pokemones, 
// y leer información sobre cada pokemon que se muestre.
// Puedes encontrar un sitio de ejemplo que hace algo similar 
// acá: https://pokedex.org/
// La página web debe:
// Mostrar una lista en tarjetas de, al menos, los primeros 151 pokemones. 
// Las tarjetas deben mostrar el nombre y tipo de cada 
// Pokémon (tipo agua, tipo fuego, tipo venenoso, etc.)
// Permitir que, al hacer click sobre la tarjeta de un pokemon, 
// se despliegue más información, como el peso, sus movimientos (ataques), etc. 
// De preferencia empleando un modal.
// El sitio web debe tener un buscador de pokemones, 
// donde puedas filtrar pokemones por nombre.
// Cosas a tener en cuenta:
// Diseño libre (Bootstrap, materialize, o tu propio css)
// Uso de clases e instancias.
// EcmaScript 6
// Repo en Github (Github pages es un plus)  ``

const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title"> ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();