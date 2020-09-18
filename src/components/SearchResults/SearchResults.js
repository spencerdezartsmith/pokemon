import React, { useEffect, useState } from 'react';
import classes from './SearchResults.module.scss';
import axios from 'axios';
import PokeCard from '../PokeCard/PokeCard';
import InfiniteGrid from 'react-infinite-grid';

const POKEMON_BASE = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_IMAGE = 'https://pokeres.bastionbot.org/images/pokemon';

function SearchResults(props) {
  const [pokemon, setPokemon] = useState({ pokemon: {} });
  const [count, setCount] = useState({ count: 0 });
  const [next, setNext] = useState({ next: '' });
  const [loading, setLoading] = useState({ loading: true });

  useEffect(() => {
    const fetchAllPoke = async () => {
      try {
        const { data } = await axios.get(POKEMON_BASE);
        if (data) {
          const { count, next, results } = data;
          if (count) setCount(count);
          if (next) setNext(next);
          if (results) {
            let pokemonObj = {};
            for (const value of results) {
              try {
                pokemonObj[value.name] = await fetchSinglePoke(value.url);
                setLoading(false);
              } catch (error) {
                console.log(`Error:: ${error}`);
              }
            }
            setPokemon(pokemonObj);
          }
        }
      } catch (error) {
        console.log(`Error:: ${error}`);
      }
    }
    fetchAllPoke();
  }, []);

  const fetchSinglePoke = async (url) => {
    try {
      const result = await axios.get(url);
      if (result.data) {
        console.log(`${POKEMON_IMAGE}/${result.data.id}`);
        return { ...result.data, image: `${POKEMON_IMAGE}/${result.data.id}.png`};
      }
    } catch (error) {
      throw Error('Something went wrong');
    }
  }

  const generatePokeCardElements = () => {
    const elements = Object.keys(pokemon).map(name => <PokeCard image={pokemon[name].image} name={name}/>);
    return elements;
  }

  return (
    <div className={classes.container}>
      <div className={classes.filters}>Filters</div>
      {loading ? 
        <p>Loading..</p> : 
        <div className={classes.results_grid}>
          {generatePokeCardElements()}
        </div>
      }
    </div>
  );
};

export default SearchResults;