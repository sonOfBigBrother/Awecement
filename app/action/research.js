/**
 * Created by David Xie on 2017/4/25.
 */
import {createAction} from 'redux-actions';
import * as types from '../constant/actionType';
import * as ResearchService from '../service/researchService';

export const getResearchForUser = createAction(types.GET_RESEARCH,
  async(roleId) => {
    return await ResearchService.getResearchForUser(roleId);
  });

export const getRefusedForUser = createAction(types.GET_REFUSED_RESEARCH,
  async({roleId}) => {
    return await ResearchService.getRefusedForUser(roleId);
  }
);

export const getAcceptedForUser = createAction(types.GET_ACCEPTED_RESEARCH,
  async({roleId}) => {
    return await ResearchService.getAcceptedForUser(roleId);
  }
);

export const publish = createAction(types.PUBLISH_RESEARCH,
  async({title, location, target, startDate, endDate, receiver}) => {
    return await ResearchService.publish(title, location,
      target, startDate, endDate, receiver);
  }, ({resolved, rejected}) => {
    return{
      resolved,
      rejected
    };
  });

export const accept = createAction(types.ACCEPT_RESEARCH, async({id}) =>{
  return await ResearchService.accept(id);
},({resolved, rejected})=>{
  return{
    resolved,
    rejected
  };
});

export const refuse = createAction(types.REFUSE_RESEARCH, async({id, rejectedReason}) =>{
  return await ResearchService.refuse(id, rejectedReason);
}, ({resolved, rejected}) => {
  return{
    resolved,
    rejected
  };
});

export const commitResearch = createAction(types.COMMIT_RESEARCH, async({data}) =>{
  return await ResearchService.commit(data);
},({resolved, rejected}) => {
  return{
    resolved,
    rejected
  };
});

export const deleteResearch = createAction(types.REMOVE_RESEARCH, async({id}) => {
  return await ResearchService.deleteResearch(id);
});

