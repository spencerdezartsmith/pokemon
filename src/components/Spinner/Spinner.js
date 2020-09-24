import React from 'react';
import classes from './Spinner.module.scss'
import spinnerImage from '../../assets/pokeball--v2.png';

function Spinner() {
  return (
    <div className={classes.container}>
      <img className={classes.loader} src={spinnerImage} alt="pokemon-go-icon"/>
    </div>
  )
}

export default Spinner;