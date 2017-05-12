/**
 * 调查页面
 * Created by David Xie on 2017/4/16.
 */
import React, {PropTypes}from 'react';
import {View, StyleSheet} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import theme from '../config/theme';
import RefusedResearch from './RefusedResearch';
import ToBeConfirmedResearch from './ToBeConfirmedResearch';
import AcceptedResearch from './AcceptedResearch';
import PulishResearch from './Publish';

export default class InvestigationFragment extends React.Component{
  static propTypes = {
    user:PropTypes.object,
    router:PropTypes.object
  };

  constructor(props){
    super(props);
  }

  render(){
    const {user, router} = this.props;
    return(
      <View style={styles.container}>
        <ScrollableTabView
          tabBarBackgroundColor="rgb(22,131,251)"
          tabBarActiveTextColor="white"
          tabBarInactiveTextColor="rgba(255,255,255,0.5)"
          tabBarTextStyle={{fontSize: theme.scrollView.fontSize}}
          tabBarUnderlineStyle={theme.scrollView.underlineStyle}>
          <ToBeConfirmedResearch tabLabel = '待确认' user = {user} flag = {1} router = {router}/>
          <RefusedResearch  tabLabel = '已拒绝' user={user}/>
          <AcceptedResearch tabLabel = '已接受' user = {user} flag={0} router={router}/>
          {user.roleId === 2 ? <PulishResearch tabLabel='发布' router ={router} user = {user}/> : null}
        </ScrollableTabView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.pageBackgroundColor
  }
});