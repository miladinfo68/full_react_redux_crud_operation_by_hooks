import {
  INCREASE_COUNT,
  DECREASE_COUNT,
  RESET_COUNT
} from '../constants/actionTypes';

export const decreaseCount = (value) => {
  return {
    type: DECREASE_COUNT,
    payload: value - 1 > 0 ? value - 1 : 0
  }
}

export const increaseCount = (value) => {
  return {
    type: INCREASE_COUNT,
    payload: value + 1
  }
}

export const resetCount = () => {
  return {
    type: RESET_COUNT
  }
}