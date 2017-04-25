/**
 * 首页
 * Created by David Xie on 2017/4/16.
 */
import React,{PropTypes} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Button} from 'react-native-elements';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import MsgList from '../component/listView/msgList';
import MsgSwipeList from '../component/listView/msgSwipeList';
import AddMsg from './AddMsg';

export default class HomeFragment extends React.Component{
  static propTypes = {
    user:PropTypes.object,
    msgAction:PropTypes.object,
    router:PropTypes.object
  };

  constructor(props){
    super(props);
  }

  _publishMsg(){
    const {user, router} = this.props;
    this.props.router.push({component:AddMsg}, {router, user});
  }

  render(){
    const {user, router} = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.actionBar}>
          <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize, paddingLeft:px2dp(160)}}>首页</Text>
          <View paddingLeft={px2dp(100)}>
            {user.roleId == 2 ? <Button color={theme.actionBar.fontColor} backgroundColor={theme.themeColor}

                                        title="发布" onPress={()=> this._publishMsg()}/>
              :null}
          </View>
        </View>
        {user.roleId == 2 ? <MsgSwipeList user = {user} router={router} />:
         <MsgList user = {user}/>}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  actionBar: {
    flexDirection:'row',
    alignItems:'center',
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
  }
});