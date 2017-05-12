/**
 * Created by David Xie on 2017/4/22.
 */
import API from '../config/api';
import * as requestService from '../util/request';
export function getMsgForUser(roleId) {
  let uri = '';
  switch (roleId){
  case 2:
    uri = API.message.getMsgForPublisher;
    break;
  case 3:
    uri = API.message.getMsgForResearcher;
    break;
  case 4:
    uri = API.message.getMsgForEmployee;
    break;
  }
  return requestService.get(uri);
}
export function deleteMsg(id) {
  let uri = API.message.delMsg + '?id=' + id ;
  return requestService.get(uri);
}

export function updateMsg(title, content, id) {
  let uri = API.message.updateMsg;
  let data = `title=${title}&content=${content}&id=${id}`;
  return requestService.post(uri,data);
}

export function addMsg(title, content, publisher, projectName) {
  let uri = API.message.addMsg;
  let data = `title=${title}&content=${content}&publisher=${publisher}&projectName=${projectName}`;
  return requestService.post(uri, data);
}
