/**
 * Created by David Xie on 2017/4/25.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Platform,
  PixelRatio
} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import Toast from '@remobile/react-native-toast';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MsgAction from '../action/message';
import Home from './Home';
import TimerMixin from 'react-timer-mixin';
import ImageButton from '../component/ImageButton';


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

  componentWillUnMount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
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
          Toast.show('发布成功');
          this.timer = TimerMixin.setTimeout(() => {
            router.resetTo({component:Home}, {user});
          }, 3000);
        }
      },
      rejected: (data) => {
        if (data){
          Toast.show('发布失败');
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
          <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize, paddingLeft:px2dp(90)}}>发布信息</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.editView3}>
            <TextInput multiline={true}
                       underlineColorAndroid='transparent'
                       style={styles.edit}
                       placeholder="请输入项目名称" onChangeText={(projectName) => this.setState({projectName})}/>
          </View>
          <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
          <View style={styles.editView1}>
            <TextInput multiline={true}
                       underlineColorAndroid='transparent'
                       style={styles.edit}
                       placeholder="请输入标题" onChangeText={(title) => this.setState({title})}/>
          </View>
          <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
          <View style={styles.editView2} >
            <TextInput multiline={true}
                       style={styles.edit}
                       underlineColorAndroid='transparent'
                       numberOfLines={4}
                       placeholder="请输入内容" onChangeText={(content) => this.setState({content})}/>
          </View>
          <View style={{marginTop: px2dp(15)}}>
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
    height: px2dp(60),
    backgroundColor:'white',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  editView3:{
    height: px2dp(48),
    backgroundColor:'white',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  }
});
export default connect(null,dispatch => ({
  msgAction:bindActionCreators(MsgAction, dispatch)
}), null, {withRef:true})(AddMsg);