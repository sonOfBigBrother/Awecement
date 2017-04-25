/**
 * Created by David Xie on 2017/4/16.
 */
import React,{Component, PropTypes} from 'react';
import {
  View, Text, Platform,
  PixelRatio, StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import Avatar from '../component/Avatar';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ConfigAction from '../action/config';
import {storageKey} from '../config';
import Login from './Login';

class MeFragment extends Component{
  static propTypes = {
    user:PropTypes.object,
    router:PropTypes.object,
    configAction:PropTypes.object
  };

  constructor(props){
    super(props);
  }

  _logout(){
    const {router, configAction } = this.props;
    configAction.removeConfig({
      key: storageKey.USER_TOKEN
    }).then(()=>{
      router.resetTo({component:Login,name:'login'});
    });
  }
  render(){
    const {user} = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.actionBar}>
          <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize}}>我</Text>
        </View>
        <View style={styles.intro}>
          <Avatar image={require('../image/user.png')} size={px2dp(55)} textSize={px2dp(20)}/>
          <View style={{marginLeft: px2dp(20)}}>
            <Text style={{color: theme.text.color, fontSize: px2dp(20)}}>{user.username}</Text>
            <Text style={{color: '#949494', fontSize:px2dp(13)}}>{user.fromWhere}</Text>
          </View>
        </View>
        <View style={styles.list}>
          { Platform.OS === 'android' ?
            <TouchableNativeFeedback
              onPress={() => this._logout()}>
              <View style={[styles.listItem, {justifyContent: 'center'}]}>
                <Text style={{color: 'red', fontSize: px2dp(15)}}>退出登录</Text>
              </View>
            </TouchableNativeFeedback>
            :
            <TouchableOpacity activeOpacity={theme.btnActiveOpacity}>
              <View style={[styles.listItem, {justifyContent: 'center'}]}>
                <Text style={{color: 'red', fontSize: px2dp(15)}}>退出登录</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
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
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
  },
  intro: {
    height: px2dp(100),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: px2dp(20),
    borderTopWidth: 1/PixelRatio.get(),
    borderBottomWidth: 1/PixelRatio.get(),
    borderBottomColor: '#c4c4c4',
    borderTopColor: '#e4e4e4',
    marginTop: px2dp(10)
  },
  list:{
    borderTopWidth: 1/PixelRatio.get(),
    borderTopColor: '#e4e4e4',
    marginTop: px2dp(12)
  },
  listItem: {
    height: px2dp(47),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10),
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1/PixelRatio.get()
  },
});
export default connect(state => ({config:state.config}),
  dispatch => ({configAction:bindActionCreators(ConfigAction, dispatch)}),
  null,{withRef:true})(MeFragment);