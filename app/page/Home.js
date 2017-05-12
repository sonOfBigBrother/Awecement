/**
 * 登录后显示的主页面
 * Created by Doctor Xie on 2017/3/23.
 */
import React,{PropTypes} from 'react';
import {
  View
} from 'react-native';
import TabBar from '../component/TabBar';

export default class HomePage extends React.Component{
  static propTypes = {
    navigator:PropTypes.object,
    user:PropTypes.object,
    router:PropTypes.object
  };

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TabBar navigator={this.props.navigator}
                user={this.props.user}
                router = {this.props.router}/>
      </View>
    );
  }
}