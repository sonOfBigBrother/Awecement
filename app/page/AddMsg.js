/**
 * Created by David Xie on 2017/4/25.
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

class AddMsg extends React.Component{
  static propTypes = {
    user:React.PropTypes.object,
    msgAction:React.PropTypes.object,
    router:React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state ={
      title:'',
      content:'',
      projectName:''
    };
  }

  _submit(){
    const {user, msgAction, router} = this.props;
    if (!(this.state.title && this.state.content && this.state.projectName)){
      Toast.show('输入信息为空或不完整');
      return;
    }
    msgAction.addMsg({
      title:this.state.title,
      content:this.state.content,
      publisher:user.username,
      projectName:this.state.projectName,
      resolved:(data) => {
        if (data.code == 200){
          router.pop();
        }
      },
      rejected: (data) => {
        if (data){
          Toast.show('发布失败');
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
          <TextInput placeholder="请输入标题" onChangeText={(title) => this.setState({title})}/>
          <TextInput placeholder="请输入内容" onChangeText={(content) => this.setState({content})}/>
          <TextInput placeholder="请输入项目名称" onChangeText={(projectName) => this.setState({projectName})}/>
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
    paddingTop:px2dp(20)
  }
});
export default connect(null,dispatch => ({
  msgAction:bindActionCreators(MsgAction, dispatch)
}), null, {withRef:true})(AddMsg);