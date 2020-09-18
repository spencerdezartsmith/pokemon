import React from 'react';
import classes from './App.module.scss';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import SearchResults from '../../components/SearchResults/SearchResults';

function App() {
  return (
    <div className={classes.App}>
      <Header/>
      <Layout>
        <SearchResults/>
      </Layout>
    </div>
  );
}

export default App;