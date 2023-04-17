const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 10;
let offset = 0;


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <input type="checkbox" class="trigger-input" id="${pokemon.number}">
        <div id="pokemon" class="pokemon ${pokemon.type}">
        <label for="${pokemon.number}">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
    
            <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                    </ol>
                    <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <section class="atributtes">
            <dl class="attributes">
      <dt>HP</dt>
      <dd>${pokemon.hp}</dd>
      <dt>Attack</dt>
      <dd>${pokemon.attack}</dd>
      <dt>Defense</dt>
      <dd>${pokemon.defense}</dd>
      <dt>Speed</dt>
      <dd>${pokemon.speed}</dd>
      <dt>Height</dt>
      <dd>${pokemon.height}</dd>
      <dt>Weight</dt>
      <dd>${pokemon.weight}</dd>
      <dt>Abilities</dt>
      <dd>${pokemon.abilities}</dd>
    </dl>
           </section>
                
                </label>
                
        </div>                
    `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})



