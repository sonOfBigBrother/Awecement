/**
 * 登录界面
 * Created by David Hsieh on 2017/3/14.
 */
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button
} from 'react-native-elements';
import md5 from 'react-native-md5';

export default class LoginView extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    };
  }
  login() {
    if (this.state.password == '' || this.state.username == ''){
      alert('帐号或密码不能为空');
      return;
    }
    fetch('192.168.1.105/login',{
      method:'POST',
      body:JSON.stringify({
        username:this.state.username,
        password:md5.hex_md5(this.state.password)
      })
    }).then();
  }
  render(){
    return(
      <View style={styles.container}>
        <FormLabel fontSize={50}>用户名</FormLabel>
        <FormInput />
        <FormLabel>密码</FormLabel>
        <FormInput />
        <Button title="登录" onPress={() => {this.login();}}/>
      </View>
    );
  }
}

const styles =StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#4285f4',
  }
});


