/**
 * Created by David Xie on 2017/4/26.
 */
import React, {PropTypes}from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  PixelRatio
} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import DatePicker from 'react-native-datepicker';
import Toast from '@remobile/react-native-toast';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ResAction from '../action/research';
import Home from './Home';

class PublishResearch extends React.Component{
  static propTypes ={
    router:PropTypes.object,
    resAction:PropTypes.object,
    user:PropTypes.object
  };

  constructor(props){
    super(props);
    this.state ={
      title:'',
      location:'',
      startDate:'',
      endDate:'',
      target:'',
      receiver:''
    };
  }

  publish(){
    if (!(this.state.title && this.state.location && this.state.target &&
      this.state.startDate && this.state.endDate && this.state.receiver)){
      Toast.show('请输入完整的信息');
    }
    const {user, router} = this.props;
    this.props.resAction.publish({
      title:this.state.title,
      location:this.state.location,
      target:this.state.target,
      startDate:this.state.startDate,
      endDate:this.state.endDate,
      receiver:this.state.receiver,
      resolved:(data) => {
        if (data.code == 200){
          router.resetTo({component:Home},{user});
        }
      },
      rejected:(data) => {
        if (data){
          Toast.show('操作失败');
        }
      }
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.editView2}>
            <TextInput multiline={true}
                       underlineColorAndroid='transparent'
                       style={styles.edit}
                       placeholder="请输入标题" onChangeText={(title) => this.setState({title})}/>
          </View>
          <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
          <View style={styles.editView1}>
            <TextInput multiline={true}
                       underlineColorAndroid='transparent'
                       style={styles.edit}
                       placeholder="请输入调查地点" onChangeText={(location) => this.setState({location})}/>
          </View>
          <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
          <View style={styles.editView1} >
            <TextInput multiline={true}
                       style={styles.edit}
                       underlineColorAndroid='transparent'
                       numberOfLines={4}
                       placeholder="请输入调查对象" onChangeText={(target) => this.setState({target})}/>
          </View>
          <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
          <View style={styles.editView1} >
            <TextInput multiline={true}
                       style={styles.edit}
                       underlineColorAndroid='transparent'
                       numberOfLines={4}
                       placeholder="请输入调查人" onChangeText={(receiver) => this.setState({receiver})}/>
          </View>
          <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
          <View style={styles.editView1}>
            <DatePicker
              style={styles.datePicker}
              customStyles={{dateInput: {borderWidth: 0}, placeholderText: {fontSize: px2dp(13), color: '#909090'}}}
              mode='date'
              date={this.state.startDate}
              placeholder='请输入开始日期'
              format='YYYY-MM-DD'
              confirmBtnText='确认'
              cancelBtnText='取消'
              iconSource={require('../image/date_icon.png')}
              onDateChange={(startDate) => this.setState({startDate})}/>
          </View>
          <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
          <View style={styles.editView1}>
            <DatePicker
              style={styles.datePicker}
              customStyles={{dateInput: {borderWidth: 0}, placeholderText: {fontSize: px2dp(13),
                color: '#909090'}}}
              mode='date'
              date={this.state.endDate}
              placeholder='请输入结束日期'
              format='YYYY-MM-DD'
              confirmBtnText='确认'
              cancelBtnText='取消'
              iconSource={require('../image/date_icon.png')}
              onDateChange={(endDate) => this.setState({endDate})}/>
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
  container: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
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
    height: px2dp(48),
    backgroundColor:'white',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  datePicker:{
    width:px2dp(165)
  }
});

export default connect(null,dispatch => ({
  resAction:bindActionCreators(ResAction, dispatch)
}), null, {withRef:true})(PublishResearch);