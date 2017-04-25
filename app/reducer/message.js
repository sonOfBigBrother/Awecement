/**
 * Created by David Xie on 2017/4/22.
 */
import * as types from '../constant/actionType';
export default function (state = {}, action) {
  const {payload, meta = {}, type, error} = action;
  const {sequence = {}, } = meta;
  if (sequence.type === 'start' || error) {
    return state;
  }
  switch(type){
  case types.GET_MESSAGE:
    return{
      ...state,
      ['messages']:payload
    };
  default:
    return state;
  }
}