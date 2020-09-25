import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './SearchBox.module.scss';
import { pokeList } from '../../data/pokeList';

function SearchBox() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredPokeNames = () => {
    return pokeList.filter((name) => name.toLowerCase().startsWith(searchTerm));
  }

  const handleOnClick = (name) => {
    history.push(`/pokemon/${name}`);
  }

  return (
    <div className={classes.container}>
      <input type="text" placeholder="Find Pokemon" onChange={handleOnChange}/>
        {searchTerm.length > 0 &&
          filteredPokeNames().map(name => 
            <div 
              key={name} 
              className={classes.listItem} 
              onClick={() => handleOnClick(name.toLowerCase())}>
                {name}
            </div>
          )
        }
    </div>
  )
}

export default SearchBox;