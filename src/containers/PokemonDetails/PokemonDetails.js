import React, { useEffect, useState } from 'react';
import classes from './PokemonDetails.module.scss';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../components/Spinner/Spinner';
import { v4 as uuidv4 } from 'uuid';

const POKEMON_IMAGE = 'https://pokeres.bastionbot.org/images/pokemon';
const POKEMON_BASE = 'https://pokeapi.co/api/v2/pokemon';

function PokemonDetails(props) {
  const history = useHistory();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const path = `${POKEMON_IMAGE}/${id}.png`;
    const handleImageLoad = async () => {
      try {
        const result = await checkImage(path);
        if (result) setImageLoaded(true);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    const checkImage = path => {
      return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(path)
          img.onerror = () => reject()

          img.src = path
      });
    }

    const fetchOnePokemon = async () => {
      try {
        const { data } = await axios.get(`${POKEMON_BASE}/${id}`);
        if (data) {
          setPokemon({ ...data, image: path });
          await handleImageLoad();
          setImageLoaded(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
    
    fetchOnePokemon();
  }, [id]);

  const onBackToResults = () => {
    history.goBack();
  }

  const capitalise = (word) => {
    return `${word[0].toUpperCase()}${word.slice(1)}`
  }

  const statsList = () => {
    return pokemon.stats.map(stat => <p key={uuidv4()} className={classes.detail}>{stat.stat.name}</p>);
  }

  const movesList = () => {
    return pokemon.moves.map(entry => <div key={uuidv4()} className={classes.move}>
        <p>{entry.move.name}</p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {loading ? <Spinner/> : <React.Fragment>
        <div className={classes.top}>
          <button onClick={onBackToResults}>
            <FontAwesomeIcon className={classes.icon} icon="chevron-left"/>
            <p>Back to results</p>
          </button>
        </div>
        <div className={classes.hero_container}>
          {imageLoaded ? <img src={pokemon.image} alt="pokemon"/> : <Spinner/>}
        </div>
        <div className={classes.right_col}>
          <div className={classes.shortlist_container}>
            <FontAwesomeIcon icon={['far', 'heart']} />
            <p>Shortlist</p>
          </div>
          <h1>{capitalise(pokemon.name)}</h1>
          <div className={classes.details}>
            <p className={classes.title}>Pokemon Stats</p>
            {statsList()}
          </div>
        </div>
        <div className={classes.content}>
          <div>
            Sprites will go here
          </div>
          <h3>Moves</h3>
          <div className={classes.movesContainer}>
            {movesList()}
          </div>
        </div>
      </React.Fragment>}   
    </div>
  )
}


export default PokemonDetails;