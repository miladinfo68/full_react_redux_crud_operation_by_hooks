import {
  INCREASE_COUNT,
  DECREASE_COUNT,
  RESET_COUNT
} from '../constants/actionTypes';



const CounterReducer = (state = {counter:0}, action) => {
  const { type, payload } = action;
  switch (type) {
    case INCREASE_COUNT:
      return {...state ,counter:payload}
    case DECREASE_COUNT:
      return {...state ,counter:payload}
    case RESET_COUNT:
      return {...state ,counter:0}
    default:
      return state
  }
}

export default CounterReducer