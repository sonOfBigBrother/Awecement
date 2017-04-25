/**
 * Created by David Xie on 2017/4/12.
 */
import * as UserService from '../service/userService';
const timeout = 15000;
function filterJson(res) {
  try {
    if (res.headers.get('content-length') > 0){
      return res.json();
    }
  }
  catch (e){
    throw new Error('data format error');
  }
}
function filterStatus(res) {
  if (res){
    return res;
  } else {
    throw new Error('I do not know');
  }
}

function timeoutFetch(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('fetch time out'));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

export function request(uri, type = 'GET', headers = {}, data=''){
  return UserService.getToken().then((token) => {
    if (!headers['Authorization']){
      headers['Authorization'] = token;
    }

    let fetchOption = {
      method:type,
      headers:headers
    };
    if (type == 'POST'){
      fetchOption.body = data;
    }

    // if(__DEV__){
    //   console.log('fetch data from uri:');
    //   console.log(uri);
    //   console.log('type');
    //   console.log(type);
    //   console.log('headers:');
    //   console.log(headers);
    //   console.log('data:');
    //   console.log(data);
    // }
    return timeoutFetch(timeout, fetch(uri, fetchOption))
      .then(filterStatus)
      .then(filterJson)
      .catch(function (err) {
        throw err;
      });
  });
}

export function get(uri, headers = {}) {
  return request(uri, 'GET', headers);
}

export function post(uri, data = '', headers = {}, flag = true) {
  if (flag){
    headers['Content-type'] = 'application/x-www-form-urlencoded';
  }
  else {
    headers['Content-type'] = 'multipart/form-data';
  }
  return request(uri, 'POST', headers, data);
}