/**
 * Created by David Xie on 2017/4/27.
 */
import * as types from '../constant/actionType';
export default function (state = {}, action) {
  const {payload, meta = {}, type, error} = action;
  const {sequence = {}, } = meta;
  if (sequence.type === 'start' || error) {
    return state;
  }
  switch(type){
  case types.GET_RESEARCH:
    return{
      ...state,
      research:payload
    };
  case types.GET_ACCEPTED_RESEARCH:
    return{
      ...state,
      research:payload
    };
  case types.GET_REFUSED_RESEARCH:
    return{
      ...state,
      research:payload
    };
  default:
    return state;
  }
}