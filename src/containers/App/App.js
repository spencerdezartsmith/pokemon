import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import classes from './App.module.scss';
import Header from '../../components/Header/Header';
import SearchResults from '../../components/SearchResults/SearchResults';

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
          <div>Hello pokemon page</div>
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