/**
 * Created by David Xie on 2017/5/8.
 */
import * as types from '../constant/actionType';

const initialState = {
  logInfo: {
    id: null,
    text: null
  }
};

export default function (state = initialState, action) {
  const { payload = {} } = action;
  switch (action.type) {
  case types.SHOW_LOG_MESSAGE:
    return {
      ...state,
      logInfo: {
        ...state.logInfo,
        ...payload
      }
    };
  default :
    return state;
  }
}
