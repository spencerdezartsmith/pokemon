import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from './SearchResults.module.scss';
import axios from 'axios';
import PokeCard from '../PokeCard/PokeCard';
import InfiniteScroll from 'react-infinite-scroller';
import FloatingButton from '../FloatingButton/FloatingButton';

const POKEMON_BASE = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_IMAGE = 'https://pokeres.bastionbot.org/images/pokemon';

function SearchResults(props) {
  const [pokemon, setPokemon] = useState({});
  const [count, setCount] = useState(0);
  const [next, setNext] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
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

  const handlePokemonData = async (results) => {
    let pokemonObj = {};
    for (const value of results) {
      try {
        pokemonObj[value.name] = await fetchSinglePoke(value.url);
      } catch (error) {
        console.log(`Error:: ${error}`);
      }
    }
    return pokemonObj;
  }

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

  const fetchMore = async () => {
    setInitialLoad(false);
    if (next && !fetching) {
      setFetching(true);
      const { data } = await axios.get(next);
      if (data) {
        const { next, results } = data;
        setNext(next);
        if (results) {
          const newPoke = await handlePokemonData(results);
          setPokemon({ ...pokemon, ...newPoke});
          setFetching(false)
        }
      }
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

  console.log('=======> props.pokemon', props.pokemon);

  return (
    <div className={classes.container}>
      <div className={classes.filters}>Filters</div>
      <FloatingButton/>
      {loading ? 
        <p>Loading..</p> : 
        <div className={classes.grid_container}>
          <h2>{count} Results</h2>
          <InfiniteScroll
            pageStart={0}
            initialLoad={initialLoad}
            loadMore={fetchMore}
            hasMore={next != null}
            loader={<div className="loader" key={0}>Loading ...</div>}>
            <div className={classes.results_grid}>
              {generatePokeCardElements()}
            </div>
          </InfiniteScroll>
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon
  };
};

export default connect(mapStateToProps)(SearchResults);