/**
 * Created by David Xie on 2017/5/1.
 */
import API from '../config/api';
import * as requestService from '../util/request';

export function getQuestionnaireForUser(roleId) {
  let uri = '';
  switch (roleId){
  case 3:
    uri = API.questionnaire.queryForInviter;
    break;
  case 2:
    uri = API.questionnaire.queryForManager;
    break;
  case 4:
    uri = API.questionnaire.queryForInvitee;
    break;
  }
  return requestService.get(uri);
}

export function getQuestionnaireForUserByCondition(roleId, creationTime, submissionTime, inviter='',receiver='') {
  let uri = '';
  switch (roleId){
  case 3:
    uri = API.questionnaire.queryForInviterByCondition;
    break;
  case 2:
    uri = API.questionnaire.queryForManagerByCondition;
    break;
  case 4:
    uri = API.questionnaire.queryForInviteeByCondition;
    break;
  }
  let data = `creationTime=${creationTime}&submissionTime=${submissionTime}&inviter=${inviter}&receiver=${receiver}`;
  return requestService.post(uri, data);
}