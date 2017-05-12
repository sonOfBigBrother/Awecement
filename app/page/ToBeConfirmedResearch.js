/**
 * Created by David Xie on 2017/4/26.
 */
import React,{PropTypes} from 'react';
import {View} from 'react-native';
import ResList from '../component/listView/resList';
import px2dp from '../util/px2dp';

export default class AllResearch extends React.Component{
  static propTypes = {
    user:PropTypes.object,
    flag:PropTypes.number,
    router:PropTypes.object
  };

  constructor(props){
    super(props);
  }

  render(){
    const {user, router, flag} = this.props;
    return(
      <View style={{marginBottom:px2dp(49), flex:1}}>
        <ResList user = {user} router = {router} flag={flag}/>
      </View>
    );
  }
}