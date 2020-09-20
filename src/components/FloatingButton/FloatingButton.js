import React from 'react';
import classes from './FloatingButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FloatingButton(props) {
  return (
    <div className={classes.floating_button}>
      <div>
        <FontAwesomeIcon icon='sliders-h'/>
        <p>Filters</p>
      </div>
      <div>
        <FontAwesomeIcon icon='sort'/>
        <p>Sort</p>
      </div>
    </div>
  );
}

export default FloatingButton;