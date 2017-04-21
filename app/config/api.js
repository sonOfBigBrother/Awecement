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
    getMsgForResearch:host + '/msg/researcher/getMsg',
    getMsgForPublisher:host + '/msg/publisher/getMsg',
    addMsg:host + '/msg/addMsg',
    delMsg:host + '/msg/delMsg',
    updateMsg:host + '/msg/updateMsg',
  },
  research:{
    publisher:{
      publish:host + '/research/publisher/publish',
      delete:host + '/research/publisher/delete',
      queryForPublisher:host + '/research/publisher/query/?publisher=',
      queryAcceptedForPublisher:host + '/research/publisher/queryAccepted/?publisher=',
      queryRefusedForPublisher:host + '/research/publisher/queryRefused/?publisher=',
    },
    receiver:{
      accept:host + '/research/receiver/accept',
      refuse:host + '/research/receiver/refuse',
      commit:host + '/research/receiver/commit',
      queryForReceiver:host + '/research/receiver/query/?receiver=',
      queryAcceptedForReceiver:host + '/research/receiver/queryAccepted/?receiver=',
      queryRefusedForReceiver:host + '/research/receiver/queryRefused/?receiver=',
    }
  }
};