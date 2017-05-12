/**
 * Created by David Xie on 2017/4/24.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Platform
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import Toast from '@remobile/react-native-toast';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MsgAction from '../action/message';
import Home from './Home';
import ImageButton from '../component/ImageButton';


class UpdateMsg extends React.Component{
  static propTypes = {
    message:React.PropTypes.object,
    msgAction:React.PropTypes.object,
    router:React.PropTypes.object,
    user:React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state ={
      title:'',
      content:''
    };
  }

  componentWillUnMount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
  }

  _submit(){
    const {message, msgAction, router, user} = this.props;
    let title = '', content = '';
    if (!(this.state.title || this.state.content)){
      Toast.show('请输入修改的信息');
      return;
    }
    if(!this.state.title){
      title = message.msg_title;
    } else {
      title = this.state.title;
    }
    if (!this.state.content){
      content = message.msg_content;
    } else {
      content = this.state.content;
    }
    msgAction.updateMsg({
      title:title,
      content:content,
      id:message.id,
      resolved:(data) => {
        if (data.code == 200){
          Toast.show('更新成功');
          this.timer = TimerMixin.setTimeout(() => {
            router.resetTo({component:Home}, {user});
          }, 2000);
        }
      },
      rejected: (data) => {
        if (data){
          Toast.show('更新失败');
        }
      }
    });
  }

  _handleBack() {
    this.props.router.pop();
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.actionBar}>
          <ImageButton
            onPress={this._handleBack.bind(this)}
            icon="md-arrow-back"
            color="white"
            imgSize={px2dp(25)}
            btnStyle={{width: px2dp(55), height: px2dp(60)}}
          />
          <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize, paddingLeft:px2dp(90)}}>更新信息</Text>
        </View>
        <View style={styles.form}>
          <View>
            <Text style={{color:'#000'}}>标题：</Text>
            <TextInput style={styles.edit} underlineColorAndroid='transparent' defaultValue={this.props.message.msg_title} onChangeText={(title) => this.setState({title:title})}/>
          </View>
          <View style={styles.editView2}>
            <Text style={{color:'#000'}}>内容：</Text>
            <TextInput style={styles.edit} underlineColorAndroid='transparent' multiline={true} numberOfLines={5} defaultValue={this.props.message.msg_content} onChangeText={(content) => this.setState({content:content})}/>
          </View>
          <View style={{marginTop: px2dp(10)}}>
            <Button title="提交" onPress={() => this._submit()}/>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.pageBackgroundColor
  },
  actionBar:{
    flexDirection:'row',
    alignItems:'center',
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
  },
  form:{
    padding:px2dp(5),
    borderWidth:px2dp(1),
    borderColor:'#f4f4f4'
  },
  edit:{
    height: px2dp(40),
    fontSize: px2dp(15),
    backgroundColor: '#fff',
    marginTop:px2dp(8),
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10)
  },
  editView1:{
    height: px2dp(48),
    backgroundColor:'white',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  editView2:{
    marginTop:px2dp(30)
  }
});
export default connect(null,dispatch => ({
  msgAction:bindActionCreators(MsgAction, dispatch)
}), null, {withRef:true})(UpdateMsg);