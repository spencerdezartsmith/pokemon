import axios from 'axios';
import * as actionTypes from './actionTypes';

const POKEMON_BASE = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_IMAGE = 'https://pokeres.bastionbot.org/images/pokemon';

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

export const fetchOnePokemon = (id) => {
  return {
    type: actionTypes.FETCH_ONE_POKEMON,
    id
  }
}

export const saveAllPokemon = (data) => {
  return {
    type: actionTypes.FETCH_ALL_POKEMON,
    data
  }
}

export const saveNextUrl = (url) => {
  return {
    type: actionTypes.SAVE_NEXT_URL,
    url
  }
}

export const savePokeCount = (count) => {
  return {
    type: actionTypes.SAVE_POKE_COUNT,
    count
  }
}