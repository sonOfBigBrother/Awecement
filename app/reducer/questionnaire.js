/**
 * Created by David Xie on 2017/5/1.
 */
import * as types from '../constant/actionType';
export default function (state = {},action) {
  const {payload, meta = {}, type, error} = action;
  const {sequence = {}, } = meta;
  if (sequence.type === 'start' || error) {
    return state;
  }
  switch(type){
  case types.GET_QUESTIONNAIRE:
    return{
      ...state,
      questionnaire:payload
    };
  case types.QUERY_BY_CONDITION:
    return{
      ...state,
      questionnaire:payload
    };
  default:
    return state;
  }
}