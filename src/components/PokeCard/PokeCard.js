import React from 'react';
import classes from './PokeCard.module.scss';

function PokeCard(props) {
  return (
      <div className={classes.card} onClick={props.onClicked}>
      <div className={classes.image_box}>
        <img className={classes.image} src={props.image} alt='pokemon-character'/>
      </div>
      <div className={classes.details_box}>
        <p className={classes.title_name}>Name</p>
        <p className={classes.name}>{props.name}</p>
        <p className={classes.title_types}>Types</p>
        <p className={classes.types}>{props.types}</p>
      </div>
    </div>
  );
}

export default PokeCard;