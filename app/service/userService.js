/**
 * Created by David Xie on 2017/4/19.
 */
import {storageKey} from '../config';
import API from '../config/api';
import * as requestService from '../util/request';
import * as storageService from '../util/storage';
export function login(username, password) {
  let uri = API.login.login;
  let data = `username=${username}&password=${password}`;
  let headers = {
    'Authorization':'first login'
  };
  return requestService.post(uri, data, headers);
}
export function getToken() {
  return storageService.getItem(storageKey.USER_TOKEN);
}