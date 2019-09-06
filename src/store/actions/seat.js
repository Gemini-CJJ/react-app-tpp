import * as Types from '../actionTypes';

export const addSeat = (seat) => {
  return {
    type: Types.ADD_SEAT,
    seat
  };
};

export const removeSeat = (id) => {
  return {
    type: Types.REMOVE_SEAT,
    id
  };
};
