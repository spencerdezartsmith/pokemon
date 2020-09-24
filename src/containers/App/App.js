import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import classes from './App.module.scss';
import Header from '../../components/Header/Header';
import SearchResults from '../SearchResults/SearchResults';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import { library } from '@fortawesome/fontawesome-svg-core';
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

function App() {
  return (
    <div className={classes.App}>
    <Router>
      <Header/>
      <Switch>
        <Route path="/shortlist">
          <div>Hello shortlist</div>
        </Route>
        <Route path="/pokemon/:id">
          <PokemonDetails/>
        </Route>
        <Route path="/">
          <SearchResults/>
        </Route>
      </Switch>
    </Router>
      
    </div>
  );
}

export default App;