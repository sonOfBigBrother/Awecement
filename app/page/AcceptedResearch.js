/**
 * Created by David Xie on 2017/4/26.
 */
import React, {PropTypes}from 'react';
import {View} from 'react-native';
import AcceptedResList from '../component/listView/acceptedResList';
import px2dp from '../util/px2dp';

export default class AcceptedResearch extends React.Component{
  static propTypes = {
    user:PropTypes.object,
    router:PropTypes.object,
    flag:PropTypes.number
  };

  constructor(props){
    super(props);
  }

  render(){
    const {user, router} = this.props;
    return(
      <View style={{marginBottom:px2dp(49), flex:1}}>
        <AcceptedResList user = {user} router={router}/>
      </View>
    );
  }
}