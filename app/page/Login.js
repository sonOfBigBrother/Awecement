/**
 * 登录界面
 * Created by David Xie on 2017/3/14.
 */
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  FormInput,
  Button
} from 'react-native-elements';
import httpUtil from '../util/httpUtil';
import Service from '../util/Service';
import px2dp from '../util/px2dp';
import HomePage from './Home';

export default class LoginPage extends React.Component {
  static propTypes = {
    navigator:React.PropTypes.any
  };
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    };
  }
  _login() {
    const {navigator} = this.props;
    if (this.state.password == '' || this.state.username == ''){
      alert('帐号或密码不能为空');
      return;
    }
    let path = Service.host + Service.login;
    httpUtil.post(path,{
      username:this.state.username,
      password:this.state.password
    },function (data) {
      if (data.code == 200){
        navigator.replace({
          component:HomePage
        });
      } else {
        alert(data.msg);
      }
    });

  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.editView1}>
            <FormInput placeholder = "用户名"
                       style={styles.edit} onChangeText = {(username) => this.setState({username})}/>
          </View>
          <View style={styles.editView2}>
            <FormInput placeholder = "密码"
                       style={styles.edit} onChangeText = {(password) => this.setState({password})}/>
          </View>
          <Button title="登录" onPress={() => this._login()}/>
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


