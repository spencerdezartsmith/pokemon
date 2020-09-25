import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Signout from '../SignoutButton/SignoutButton';
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
          <li>
            <Link to='/shortlist' style={{ textDecoration: 'none', color: 'black' }}>
              Shortlist
            </Link>
          </li>
          <li>
            {props.isLoggedIn ? <Signout/> : <Link to='/signin' style={{ textDecoration: 'none', color: 'black' }}>
              Sign in
            </Link>}
          </li>
        </ul>
      </nav>
    </header>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.authUser != null,
  }
}
 
export default connect(mapStateToProps)(Header);