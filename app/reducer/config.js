import * as types from '../constant/actionType';
export default function (state = {}, action) {
  const { payload, meta = {}, type} = action;
  const { key, value } = meta;
  switch (type) {
  case types.GET_CONFIG:
    return {
      ...state,
      [key]: payload
    };
  case types.UPDATE_CONFIG:
    return {
      ...state,
      [key]: value
    };
  default:
    return state;
  }
}