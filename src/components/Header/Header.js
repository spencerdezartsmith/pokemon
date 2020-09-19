import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import logo from '../../assets/pokemon-logo.png';

function Header(props) {
  return (
    <header className={classes.header}>
      <Link to='/'>
        <img src={logo} className={classes.logo} alt='logo' />
      </Link>
      <nav>
        <ul>
          <li><Link to='/shortlist' style={{ textDecoration: 'none', color: 'black' }}>Shortlist</Link></li>
          <li>Login/Sign up</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;