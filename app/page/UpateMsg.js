/**
 * Created by David Xie on 2017/4/24.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text
} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import Toast from '@remobile/react-native-toast';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MsgAction from '../action/message';

class UpdateMsg extends React.Component{
  static propTypes = {
    message:React.PropTypes.object,
    msgAction:React.PropTypes.object,
    router:React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state ={
      title:'',
      content:''
    };
  }

  _submit(){
    const {message, msgAction, router} = this.props;
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
          router.pop();
        }
      },
      rejected: (data) => {
        if (data){
          Toast.show('更新失败');
        }
      }
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.actionBar}>
          <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize}}>更新信息</Text>
        </View>
        <View style={styles.form}>
          <TextInput placeholder={this.props.message.msg_title} onChangeText={(title) => this.setState({title:title})}/>
          <TextInput placeholder={this.props.message.msg_content} onChangeText={(content) => this.setState({content:content})}/>
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
  form:{

  }
});
export default connect(null,dispatch => ({
  msgAction:bindActionCreators(MsgAction, dispatch)
}), null, {withRef:true})(UpdateMsg);