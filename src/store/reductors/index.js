import * as Types from '../actionTypes';

export default (state=[], action) => {
  // const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case Types.ADD_SEAT:
      return [...state,action.seat];

    case Types.REMOVE_SEAT:
      return state.filter(seat => seat.id !== action.id);

    default:
      return state;
  }
};
