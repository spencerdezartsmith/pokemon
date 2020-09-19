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
              } catch (error) {
                console.log(`Error:: ${error}`);
              }
            }
            setPokemon(pokemonObj);
            setLoading(false);
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
        return { ...result.data, image: `${POKEMON_IMAGE}/${result.data.id}.png`};
      }
    } catch (error) {
      throw Error('Something went wrong');
    }
  }

  const capitalise = (word) => {
    return `${word[0].toUpperCase()}${word.slice(1)}`
  }

  const getTypesString = (types) => {
    if (types) return types.map(type => capitalise(type.type.name)).join(', ');
    return '';
  }

  const generatePokeCardElements = () => {
    return Object.keys(pokemon).map(name => (<PokeCard
      key={pokemon[name].id}
      id={pokemon[name].id}
      image={pokemon[name].image} 
      name={capitalise(name)}
      types={getTypesString(pokemon[name].types)}/>));
  }

  return (
    <div className={classes.container}>
      <div className={classes.filters}>Filters</div>
      {loading ? 
        <p>Loading..</p> : 
        <div className={classes.grid_container}>
          <h2>{count} Results</h2>
          <div className={classes.results_grid}>
            {generatePokeCardElements()}
          </div>
        </div>
        
      }
    </div>
  );
};

export default SearchResults;