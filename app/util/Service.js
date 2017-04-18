/**
 * Created by David Xie on 2017/4/12.
 */
const Service = {
  host:'http://192.168.1.105:3000',
  login:'/login',
  loginByToken:'/login/token',
  getMsgForEmployee:'/msg/employee/getMsg',
  getMsgForResearch:'/msg/researcher/getMsg',
  getMsgForPublisher:'/msg/publisher/getMsg',
  addMsg:'/msg/addMsg',
  delMsg:'/msg/delMsg',
  updateMsg:'/msg/updateMsg',
  publish:'/research/publisher/publish',
  accept:'/research/receiver/accept',
  refuse:'/research/receiver/refuse',
  delete:'/research/publisher/delete',
  commit:'/research/receiver/commit',
  queryForReceiver:'/research/receiver/query/:receiver',
  queryAcceptedForReceiver:'/research/receiver/queryAccepted/:receiver',
  queryRefusedForReceiver:'/research/receiver/queryRefused/:receiver',
  queryForPublisher:'/research/publisher/query/:publisher',
  queryAcceptedForPublisher:'/research/publisher/queryAccepted/:publisher',
  queryRefusedForPublisher:'/research/publisher/queryRefused/:publisher',
  queryAllForEmployee:'/quest/invitee/query',
  queryAllForManInCharge:'/quest/manager/query',
  queryAllForResearcher:'/quest/inviter/query',
  queryByConditionForEmployee:'/quest/invitee/queryByCondition',
  queryByConditionForResearcher:'/quest/inviter/queryByCondition',
  queryByConditionForManInCharge:'/quest/manager/queryByCondition'
};
export default Service;