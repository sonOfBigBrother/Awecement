/**
 * Created by David Xie on 2017/4/26.
 */
import React,{PropTypes} from 'react';
import {View} from 'react-native';
import RejectedResearchList  from '../component/listView/rejectedResList';
import px2dp from '../util/px2dp';
export default class RefusedResearch extends React.Component{
  static propTypes ={
    user:PropTypes.object
  };

  constructor(props){
    super(props);
  }

  render(){
    const {user} = this.props;
    return(
      <View style={{marginBottom:px2dp(49)}}>
        <RejectedResearchList user = {user}/>
      </View>
    );
  }
}