import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import classes from './SearchResults.module.scss';
import PokeCard from '../../components/PokeCard/PokeCard';
import InfiniteScroll from 'react-infinite-scroller';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import Spinner from '../../components/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';

function SearchResults(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const { fetchAllPoke, pokemon } = props;
  const hasFetched = Object.keys(pokemon).length;
  
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await fetchAllPoke();
        setLoading(false);
      } catch (error) {
        console.log(`Error:: ${error}`);
      }
    }
    if (!hasFetched) fetch();
  }, [fetchAllPoke, hasFetched]);

  const fetchMore = async () => {
    setInitialLoad(false);
    if (props.next && !fetching) {
      setFetching(true);
      await fetchAllPoke(props.next);
      setFetching(false);
    }
  }

  const capitalise = (word) => {
    return `${word[0].toUpperCase()}${word.slice(1)}`
  }

  const getTypesString = (types) => {
    if (types) return types.map(type => capitalise(type.type.name)).join(', ');
    return '';
  }

  const handlePokeCardClick = (id, name) => {
    history.push(`/pokemon/${id}`);
  }

  const generatePokeCardElements = () => {
    return Object.keys(props.pokemon).map(name => (<PokeCard
      key={props.pokemon[name].id}
      id={props.pokemon[name].id}
      image={props.pokemon[name].image} 
      name={capitalise(name)}
      onClicked={() => handlePokeCardClick(props.pokemon[name].id, name)}
      types={getTypesString(props.pokemon[name].types)}/>));
  }

  return (
    <div className={classes.container}>
      <div className={classes.filters}>Filters</div>
      <FloatingButton/>
      {loading ? 
        <Spinner/> : 
        <div className={classes.grid_container}>
          <h2>{props.count} Results</h2>
          <InfiniteScroll
            pageStart={0}
            initialLoad={initialLoad}
            loadMore={fetchMore}
            hasMore={props.next != null}
            threshold={800}
            loader={<div className="loader" key={0}>Loading ...</div>}>
            <div className={classes.results_grid}>
              {generatePokeCardElements()}
            </div>
          </InfiniteScroll>
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    pokemon: state.poke.pokemon,
    count: state.poke.count,
    next: state.poke.next,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllPoke: (next) => dispatch(actionCreators.fetchAllPokemon(next)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);