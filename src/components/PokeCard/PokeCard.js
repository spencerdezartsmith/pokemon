import React from 'react';
import classes from './PokeCard.module.scss';

function PokeCard(props) {
  return (
    <div className={classes.card}>
      <img className={classes.image} src={props.image} alt='pokemon-character'/>
      <div>
        <p className={classes.name}>{props.name}</p>
      </div>
      
    </div>
  );
}

export default PokeCard;