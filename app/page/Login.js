/**
 * 登录界面
 * Created by David Xie on 2017/3/14.
 */
import React,{Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import px2dp from '../util/px2dp';
import HomePage from './Home';
import TimerMixin from 'react-timer-mixin';
import Toast from '@remobile/react-native-toast';
import * as ConfigAction from '../action/config';
import * as UserAction from '../action/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {storageKey} from '../config';

class LoginPage extends Component {
  static propTypes = {
    navigator:PropTypes.object,
    userAction:PropTypes.object,
    configAction:PropTypes.object,
    router:PropTypes.object,
    roleId:PropTypes.number
  };
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    };
  }
  _login() {
    if (this.state.username == ''){
      Toast.show('请输入用户名');
      return;
    } else if(this.state.password == ''){
      Toast.show('请输入密码');
      return;
    }
    this.props.userAction.login({
      username: this.state.username,
      password: this.state.password,
      resolved: (data) => {
        if (data.code ==200){
          this._handleLoginResolved(data);
        } else {
          LoginPage._handleLoginRejected();
        }
      },
      rejected: (data) => {
        if (data){
          LoginPage._handleLoginRejected();
        }
      }
    });
  }

  _handleLoginResolved(data){
    let user = {roleId:data.roleId,
      fromWhere:data.fromWhere,
      username:this.state.username};
    this.props.configAction.updateConfig({
      key: storageKey.USER_TOKEN,
      value:data
    });

    this.timer = TimerMixin.setTimeout(() => {
      this.props.router.resetTo({component:HomePage, name:'home'}, {user});
    }, 2000);
  }

  static _handleLoginRejected(){
    Toast.show('登录失败，帐号或密码错误');
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.editView1}>
            <TextInput placeholder = "用户名"
                       underlineColorAndroid="transparent"
                       placeholderTextColor="#c4c4c4"
                       style={styles.edit}
                       onChangeText = {(username) => this.setState({username})}/>
          </View>
          <View style={styles.editView2}>
            <TextInput placeholder = "密码"
                       underlineColorAndroid="transparent"
                       placeholderTextColor="#c4c4c4"
                       style={styles.edit}
                       onChangeText = {(password) => this.setState({password})}/>
          </View>
          <View style={{marginTop: px2dp(10)}}>
            <Button title="登录" onPress={() => this._login()}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles =StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#0878ff',
  },
  form:{
    margin:px2dp(20)
  },
  edit:{
    height: px2dp(40),
    fontSize: px2dp(13),
    backgroundColor: '#fff',
    paddingLeft: px2dp(15),
    paddingRight: px2dp(15)
  },
  editView1:{
    height: px2dp(48),
    backgroundColor:'white',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  editView2:{
    height: px2dp(48),
    backgroundColor:'white',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
});
export default connect(null, dispatch => ({
  userAction : bindActionCreators(UserAction, dispatch),
  configAction : bindActionCreators(ConfigAction, dispatch)
}), null, {
  withRef: true
})(LoginPage);

