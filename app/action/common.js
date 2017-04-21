/**
 * Created by David Xie on 2017/4/20.
 */
import { createAction } from 'redux-actions';
import _ from 'lodash';
import * as types from '../constant/actionType';

export const message = createAction(types.SHOW_MESSAGE, (text)=> {
  let id = _.uniqueId();
  return {
    id: id,
    text
  };
});
