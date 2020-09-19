import React from 'react';
import classes from './PokeCard.module.scss';
import { v4 as uuidv4 } from 'uuid';

function PokeCard(props) {
  const capitalise = (name) => {
    return `${name[0].toUpperCase()}${name.slice(1)}`
  }

  return (
    <div className={classes.card}>
      <div className={classes.image_box}>
        <img className={classes.image} src={props.image} alt='pokemon-character'/>
      </div>
      <div className={classes.details_box}>
        <p className={classes.title_name}>Name</p>
        <p className={classes.name}>{capitalise(props.name)}</p>
        <p className={classes.title_types}>Types</p>
        <div className={classes.types}>
          {props.types.map(type => <p key={uuidv4()}>{capitalise(type?.type?.name) || ''}&nbsp;</p>)}
        </div>
      </div>
    </div>
  );
}

export default PokeCard;