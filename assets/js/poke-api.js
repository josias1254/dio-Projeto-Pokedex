const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types
    
    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    const stats = pokeDetail.stats.map((typeSlot) => typeSlot.base_stat);
    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name);
    console.log(pokeDetail);
    pokemon.hp = stats[0];
    pokemon.attack = stats[1];
    pokemon.defense = stats[2];
    pokemon.speed = stats[5];
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = abilities

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}