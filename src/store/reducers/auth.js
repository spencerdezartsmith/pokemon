import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authUser: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_USER:
      return Object.assign({}, state, {
        authUser: action.authUser
      });
    case actionTypes.SIGNOUT_USER:
      return Object.assign({}, state, {
        authUser: null
      });
    default:
      return state;
  }
}

export default reducer;