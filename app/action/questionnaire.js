/**
 * Created by David Xie on 2017/5/1.
 */
import {createAction} from 'redux-actions';
import * as types from '../constant/actionType';
import * as QuestionnaireService from '../service/questService';

export const getQuestionnaireForUser = createAction(types.GET_QUESTIONNAIRE,
  async({roleId}) => {
    return await QuestionnaireService.getQuestionnaireForUser(roleId);
  });

export const getQuestionnaireByCondition = createAction(types.QUERY_BY_CONDITION,
  async({roleId, creationTime, submissionTime,
    inviter, receiver, productionCapacity, province}) => {
    return await QuestionnaireService
      .getQuestionnaireForUserByCondition(roleId, creationTime,
        submissionTime, inviter,
        receiver, productionCapacity, province);
  });


