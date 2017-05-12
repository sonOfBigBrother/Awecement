/**
 * Created by David Xie on 2017/4/22.
 */
import * as types from '../constant/actionType';
export default function (state = {}, action) {
  const {payload, meta = {}, type, error} = action;
  const {sequence = {},id } = meta;
  if (sequence.type === 'start' || error) {
    return state;
  }
  switch(type){
  case types.GET_MESSAGE:
    return{
      ...state,
      messages:payload
    };
  case types.REMOVE_MESSAGE:
    return removeMsg(state, id);
  default:
    return state;
  }
}

function removeMsg(state, id) {
  let results = [],
    messages = state.message;
  if (messages && messages.length){
    for (let i = 0, len = messages.length; i < len; i++){
      let msgItem = messages[i];
      if (msgItem.id !== id){
        let resultItem = {...msgItem};
        results.push(resultItem);
      }
    }
  }
  return {
    ...state,
    messages:results
  };
}