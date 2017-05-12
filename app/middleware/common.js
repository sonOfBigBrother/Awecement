import * as commonAction from '../action/common';

export default function common({dispatch}) {
  return next => action => {
    const { payload, error} = action;
    if (error === true && payload && payload.logInfo) {
      dispatch(commonAction.message(payload.logInfo));
    }
    next(action);
  };
}
