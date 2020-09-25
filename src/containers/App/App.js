import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import classes from './App.module.scss';
import Header from '../../components/Header/Header';
import SearchResults from '../SearchResults/SearchResults';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import Signup from '../../components/Signup/Signup';
import Signin from '../../components/Signin/Signin';
import { withFirebase } from '../../components/Firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Routes from '../../routes';
import * as actionTypes from '../../store/actions/actionTypes';
import { 
  faSlidersH,
  faSort,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

library.add(
  faSlidersH,
  faSort,
  faChevronLeft,
  faHeart
);

function App(props) {
  const { firebase, signin } = props;
  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(
      authUser => signin(authUser),
    );
    return () => listener();
  },[firebase, signin]);

  return (
    <div className={classes.App}>
    <Router>
      <Header/>
      <Switch>
        <Route path={Routes.SHORTLIST}>
          {
            props.isLoggedIn ? 
            <div>Hello shortlist</div> : 
            <Redirect to={Routes.SIGN_IN}/>
          }
        </Route>
        <Route path={Routes.POKEMON_DETAIL}>
          <PokemonDetails/>
        </Route>
        <Route path={Routes.SIGN_IN}>
          <Signin/>
        </Route>
        <Route path={Routes.SIGN_UP}>
          <Signup/>
        </Route>
        <Route path={Routes.SEARCH_RESULTS}>
          <SearchResults/>
        </Route>
      </Switch>
    </Router>
      
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    signin: (authUser) => dispatch({ type: actionTypes.SIGNIN_USER, authUser }),
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.authUser != null,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(App));