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
  PixelRatio,
  Image,
  Dimensions
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
import Spinner from '../component/Spinner';

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
      password:'',
      pending: false
    };
  }

  componentWillUnMount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
  }

  _login() {
    if (this.state.username == ''){
      Toast.show('请输入用户名');
      return;
    } else if(this.state.password == ''){
      Toast.show('请输入密码');
      return;
    }
    this.setState({pending: true});
    this.props.userAction.login({
      username: this.state.username,
      password: this.state.password,
      resolved: (data) => {
        if (data.code ==200){
          this._handleLoginResolved(data);
        } else {
          this._handleLoginRejected();
        }
      },
      rejected: (data) => {
        if (data){
          this._handleLoginRejected();
        }
      }
    });
  }

  _handleLoginResolved(data){
    let user = {roleId:data.roleId,
      fromWhere:data.fromWhere,
      username:this.state.username};
    this.props.configAction.updateConfig(storageKey.USER_TOKEN,
      data.token
    );

    Toast.show('恭喜您，登录成功');

    this.timer = TimerMixin.setTimeout(() => {
      this.props.router.resetTo({component:HomePage, name:'home'}, {user});
    }, 3000);
  }

  _handleLoginRejected(){
    this.setState({pending: false});
    Toast.show('登录失败，帐号或密码错误');
  }

  renderPending(){
    if (this.state.pending === true){
      return(
        <Spinner style={styles.pending_container}/>
      );
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={styles.logo}
            source={require('../image/logo.jpg')}
            resizeMethod={'scale'}/>
        </View>
        <View style={styles.form}>
          <View style={styles.editView1}>
            <TextInput placeholder = '用户名'
                       underlineColorAndroid='transparent'
                       placeholderTextColor='#c4c4c4'
                       style={styles.edit}
                       onChangeText = {(username) => this.setState({username})}/>
          </View>
          <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
          <View style={styles.editView2}>
            <TextInput placeholder = '密码'
                       secureTextEntry={true}
                       underlineColorAndroid='transparent'
                       placeholderTextColor='#c4c4c4'
                       style={styles.edit}
                       onChangeText = {(password) => this.setState({password})}/>
          </View>
          <View style={{marginTop: px2dp(10)}}>
            <Button title='登录' onPress={() => this._login()}/>
          </View>
        </View>
        {this.renderPending()}
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
    margin:px2dp(20),
    paddingTop:px2dp(50)
  },
  image:{
    paddingTop:px2dp(70),
    paddingLeft:px2dp(125)
  },
  logo:{
    height:px2dp(100),
    width:px2dp(100),
    borderRadius:px2dp(50)
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
  pending_container: {
    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0,
    margin: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor:'rgba(255, 255, 255, 0.1)',
    justifyContent:'center',
    alignItems: 'center'
  }
});
export default connect(null, dispatch => ({
  userAction : bindActionCreators(UserAction, dispatch),
  configAction : bindActionCreators(ConfigAction, dispatch)
}), null, {
  withRef: true
})(LoginPage);

