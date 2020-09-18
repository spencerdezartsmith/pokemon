import React from 'react';
import classes from './Header.module.scss';
import logo from '../../assets/pokemon-logo.png';

function Header(props) {
  return (
    <header className={classes.header}>
      <img src={logo} className={classes.logo} alt="logo" />
      <div className={classes.nav_item_container}>
        <div className={classes.nav_item}>
          Shortlist
        </div>
        <div className={classes.nav_item}>
          Login/Sign up
        </div>
      </div>
      
    </header>
  )
}

export default Header;