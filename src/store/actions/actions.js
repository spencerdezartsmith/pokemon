import axios from 'axios';

const POKEMON_BASE = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_IMAGE = 'https://pokeres.bastionbot.org/images/pokemon';

export const FETCH_ALL_POKEMON = 'FETCH_ALL_POKEMON';
export const FETCH_ONE_POKEMON = 'FETCH_ONE_POKEMON';
export const SAVE_NEXT_URL = 'SAVE_NEXT_URL';
export const SAVE_POKE_COUNT = 'SAVE_POKE_COUNT';

export const fetchAllPokemon = (savedNext) => {
  return async dispatch => {
    const { data } = await axios.get(savedNext ? savedNext : POKEMON_BASE);
    if (data) {
      const { count, next, results } = data;
      if (count) dispatch(savePokeCount(count));
      if (next) dispatch(saveNextUrl(next));
      if (results) {
        let pokemonObj = {};
        for (const value of results) {
          try {
            const result = await axios.get(value.url);
            pokemonObj[value.name] = result.data ? { ...result.data, image: `${POKEMON_IMAGE}/${result.data.id}.png` } : {};
          } catch (error) {
            console.log(`Error:: ${error}`);
          }
        }
        dispatch(saveAllPokemon(pokemonObj));
      }
    }
  }
}

export const saveAllPokemon = (data) => {
  return {
    type: FETCH_ALL_POKEMON,
    data
  }
}

export const saveNextUrl = (url) => {
  return {
    type: SAVE_NEXT_URL,
    url
  }
}

export const savePokeCount = (count) => {
  return {
    type: SAVE_POKE_COUNT,
    count
  }
}

export const fetchOnePokemon = (id) => {
  return {
    type: FETCH_ALL_POKEMON,
    id
  }
}