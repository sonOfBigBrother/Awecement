/**
 * Created by David Xie on 2017/4/19.
 */
import {createAction} from 'redux-actions';
import * as types from '../constant/actionType';
import * as UserService from '../service/userService';

export const login = createAction(
  types.LOGIN,
  async({username, password}) => {
    return await UserService.login(username, password);
  },
  ({username, resolved, rejected}) => {
    return {
      username,
      resolved,
      rejected
    };
  }
);