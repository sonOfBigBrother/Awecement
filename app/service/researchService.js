/**
 * Created by David Xie on 2017/4/25.
 */
import API from '../config/api';
import * as requestService from '../util/request';

export function getResearchForUser(roleId) {
  let uri ='';
  if (roleId === 2) {
    uri = API.research.publisher.queryForPublisher;
  }
  if (roleId === 3) {
    uri = API.research.receiver.queryForReceiver;
  }
  return requestService.get(uri);
}

export function getAcceptedForUser(roleId) {
  let uri ='';
  if (roleId === 2) {
    uri = API.research.publisher.queryAcceptedForPublisher;
  }
  if (roleId === 3) {
    uri = API.research.receiver.queryAcceptedForReceiver;
  }
  return requestService.get(uri);
}

export function getRefusedForUser(roleId) {
  let uri ='';
  if (roleId === 2) {
    uri = API.research.publisher.queryRefusedForPublisher;
  }
  if (roleId === 3) {
    uri = API.research.receiver.queryRefusedForReceiver;
  }
  return requestService.get(uri);
}

export function publish(title, location, target,
                        startDate, endDate, receiver ) {
  let uri = API.research.publisher.publish;
  let data = `title=${title}&location=${location}&target=${target}
  &startDate=${startDate}&endDate=${endDate}&receiver=${receiver}`;
  return requestService.post(uri, data);
}

export function accept(id) {
  let uri = API.research.receiver.accept + '?id=' + id;
  return requestService.get(uri);
}

export function refuse(id, rejectedReason) {
  let uri = API.research.receiver.refuse + '?id=' + id + '&rejectedReason=' + rejectedReason;
  return requestService.get(uri);
}

export function deleteResearch(id) {
  let uri = API.research.publisher.deleteResearch + '?id=' + id;
  return requestService.get(uri);
}

export function commit(data) {
  let uri = API.research.receiver.commit;
  return requestService.post(uri, data, false);
}