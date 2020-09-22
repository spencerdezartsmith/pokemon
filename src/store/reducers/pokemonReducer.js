import * as actionTypes from '../actions/actions';

const initialState = {
  pokemon: {},
  next: '',
  count: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_POKEMON:
      return Object.assign({}, state, {
        pokemon: { ...state.pokemon, ...action.data }
      });
    case actionTypes.SAVE_NEXT_URL:
      return Object.assign({}, state, {
        next: action.url
      });
    case actionTypes.SAVE_POKE_COUNT:
      return Object.assign({}, state, {
        count: action.count
      });
    default:
      return state;
  }
  
}

export default reducer;