/**
 * Created by David Xie on 2017/4/19.
 */
import { createAction } from 'redux-actions';
import * as types from '../constant/actionType';
import * as storageService from '../util/storage';

export const updateConfig = createAction(
  types.UPDATE_CONFIG,
  async({key, value}) => {
    return storageService.mergeItem(key, value);
  },(key, value, resolved, rejected) => {
    return {
      key,
      value,
      resolved,
      rejected
    };
  }
);
export const removeConfig = createAction(types.REMOVE_CONFIG, async({key})=>{
  return storageService.removeItem(key);
}, ({key})=>{
  return {
    key
  };
});

export const getConfig = createAction(types.GET_CONFIG, async({key})=> {
  return await storageService.getItem(key);
}, ({key, resolved, rejected})=>{
  return {
    key,
    resolved,
    rejected
  };
});
