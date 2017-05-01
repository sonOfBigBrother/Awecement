/**
 * Created by David Xie on 2017/4/19.
 */
const host = 'http://192.168.1.105:3000';
export default {
  login:{
    login:host + '/login',
    loginByToken:host + '/login/token',
  },
  message:{
    getMsgForEmployee:host + '/msg/employee/getMsg',
    getMsgForResearcher:host + '/msg/researcher/getMsg',
    getMsgForPublisher:host + '/msg/publisher/getMsg',
    addMsg:host + '/msg/addMsg',
    delMsg:host + '/msg/delMsg',
    updateMsg:host + '/msg/updateMsg',
  },
  research:{
    publisher:{
      publish:host + '/research/publisher/publish',
      deleteResearch:host + '/research/publisher/delete',
      queryForPublisher:host + '/research/publisher/query',
      queryAcceptedForPublisher:host + '/research/publisher/queryAccepted',
      queryRefusedForPublisher:host + '/research/publisher/queryRefused',
    },
    receiver:{
      accept:host + '/research/receiver/accept',
      refuse:host + '/research/receiver/refuse',
      commit:host + '/research/receiver/commit',
      queryForReceiver:host + '/research/receiver/query',
      queryAcceptedForReceiver:host + '/research/receiver/queryAccepted',
      queryRefusedForReceiver:host + '/research/receiver/queryRefused',
    }
  },
  questionnaire:{
    queryForInviter:host + '/quest/inviter/query',
    queryForInvitee:host + '/quest/invitee/query',
    queryForManager:host + '/quest/manager/query',
    queryForInviterByCondition:host + '/quest/inviter/queryByCondition',
    queryForInviteeByCondition:host + '/quest/invitee/queryByCondition',
    queryForManagerByCondition:host + '/quest/manager/queryByCondition'
  }
};