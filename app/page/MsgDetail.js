/**
 * Created by David Xie on 2017/5/9.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Platform
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import {Button} from 'react-native-elements';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import Toast from '@remobile/react-native-toast';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as MsgAction from '../action/message';
import UpdateMsg from './UpateMsg';
import Home from './Home';
import ImageButton from '../component/ImageButton';

class MsgDetail extends React.Component{
  static propTypes = {
    user:React.PropTypes.object,
    message:React.PropTypes.object,
    msgAction:React.PropTypes.object,
    router:React.PropTypes.object
  };

  constructor(props){
    super(props);
  }

  componentWillUnMount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
  }

  _deleteMsg(id){
    const {msgAction, router, user} = this.props;
    msgAction.deleteMsg(id);
    Toast.show('删除成功');
    this.timer = TimerMixin.setTimeout(() => {
      router.resetTo({component:Home}, {user});
    }, 3000);
  }

  _updateMsg(message){
    const {user} = this.props;
    this.props.router.push({component:UpdateMsg}, {message, user});
  }

  _handleBack() {
    this.props.router.pop();
  }

  render(){
    const {message, user} = this.props;
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
          <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize, paddingLeft:px2dp(105)}}>详情</Text>
          <View paddingLeft={px2dp(108)}>
            {user.roleId == 2 ? <Button title="修改"
                                        color={theme.actionBar.fontColor}
                                        backgroundColor={theme.themeColor}
                                        onPress={()=> this._updateMsg(message)}/>
              :null}
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.title}>
            <Text style={styles.textTitle}>{message.msg_title}</Text>
          </View>
          <View style={styles.content}>
            <Text>{message.msg_content}</Text>
          </View>
          <View style={styles.project}>
            <Text>项目：</Text>
            <Text>{message.project_name}</Text>
          </View>
          {user.roleId !== 2 ?
            <View style={styles.publisher}>
              <Text>发布人:</Text>
              <Text>{message.publisher}</Text>
            </View>
          :null}
        </View>
        {user.roleId === 2 ?
        <View style={styles.delete}>
          <TouchableHighlight
            onPress={() => this._deleteMsg(message.id)}>
            <View style={styles.delButton}>
              <Text style={{color: 'white', fontSize: px2dp(18)}}>删除</Text>
            </View>
          </TouchableHighlight>
        </View> : null}
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
    paddingTop:px2dp(15)
  },
  title:{
    flexDirection:'row',
    justifyContent:'center'
  },
  textTitle:{
    color: '#000',
    fontSize: px2dp(20),
  },
  content:{
    margin:px2dp(15)
  },
  project:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:px2dp(50),
    marginRight:px2dp(15)
  },
  publisher:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:px2dp(10),
    marginRight:px2dp(15)
  },
  delete:{
    flex:1,
    justifyContent:'flex-end',
  },
  delButton:{
    height:px2dp(47),
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  }

});
export default connect(null,dispatch => ({
  msgAction:bindActionCreators(MsgAction, dispatch)
}), null, {withRef:true})(MsgDetail);