/**
 * Created by David Xie on 2017/4/17.
 */
import {AsyncStorage} from 'react-native';

export function setItem(key, value) {
  if (key && value){
    return AsyncStorage.setItem(key, value);
  }
}

export function mergeItem(key, value) {
  if (key && value){
    return AsyncStorage.mergeItem(key, value);
  }
}

export function getItem(key) {
  return AsyncStorage.getItem(key)
    .then(function (value) {
      return value;
    });
}

export function multiGet(keys) {
  return AsyncStorage.multiGet(keys)
    .then(results=> {
      return results.map(item=> {
        return [item[0], item[1]];
      });
    });
}

export function multiRemove(keys) {
  return AsyncStorage.multiRemove(keys);
}

export const removeItem = AsyncStorage.removeItem;

export const clear = AsyncStorage.clear;