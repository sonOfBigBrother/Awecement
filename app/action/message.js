/**
 * Created by David Xie on 2017/4/22.
 */
import {createAction} from 'redux-actions';
import * as types from '../constant/actionType';
import * as msgService from '../service/msgService';
export const getMsgForUser = createAction(types.GET_MESSAGE,
  async(roleId) => {
    return await msgService.getMsgForUser(roleId);
  });

export const deleteMsg = createAction(types.REMOVE_MESSAGE,
  async(id) => {
    return await msgService.deleteMsg(id);
  });

export const updateMsg = createAction(types.UPDATE_MESSAGE,
  async({title, content, id}) => {
    return await msgService.updateMsg(title, content, id);
  },({resolved, rejected})=> {
    return {
      resolved,
      rejected
    };
  });

export const addMsg = createAction(types.ADD_MESSAGE,
  async({title, content, publisher, projectName}) => {
    return await msgService.addMsg(title, content, publisher, projectName);
  },({resolved, rejected}) => {
    return{
      resolved,
      rejected
    };
  });