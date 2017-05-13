/**
 * Created by David Xie on 2017/4/16.
 */
import React, {PropTypes}from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Button,
  TextInput,
  Text,
  PixelRatio
} from 'react-native';
import {connect} from 'react-redux';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import AllQuest from  './AllQuest';
import ImageButton from '../component/ImageButton';
import Modal from 'react-native-modalbox';
import DatePicker from 'react-native-datepicker';
import * as QuestAction from '../action/questionnaire';
import { bindActionCreators } from 'redux';

class QuestionnaireFragment extends React.Component{
  static propTypes = {
    user:PropTypes.object,
    questAction:PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      creationTime:'',
      submissionTime:'',
      inviter:'',
      receiver:'',
      province:'',
      productionCapacity:''
    };
  }

  _openModal(){
    this.refs.queryModal.open();
  }

  _queryByCondition(){
    this.props.questAction.getQuestionnaireByCondition({roleId:this.props.user.roleId,
      creationTime:this.state.creationTime,
      submissionTime:this.state.submissionTime,
      inviter:this.state.inviter,
      receiver:this.state.receiver,
      productionCapacity:this.state.productionCapacity,
      province:this.state.province
    });
    this.refs.queryModal.close();
  }

  render(){
    const employeeOpt = (
      <View>
        <View style={styles.editView}>
          <TextInput underlineColorAndroid='transparent'
                     style={styles.edit}
                   placeholder='邀请人' onChangeText={(inviter) => this.setState({inviter})}/>
        </View>
        <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
      </View>
    );
    const researcherOpt = (
      <View>
        <View style={styles.editView}>
          <TextInput underlineColorAndroid='transparent'
                     style={styles.edit}
                     placeholder='受邀人' onChangeText={(receiver) => this.setState({receiver})}/>
        </View>
        <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
    </View>
    );
    const {user} = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.actionBar}>
          <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize, paddingLeft:px2dp(160)}}>问卷</Text>
          <View style={{marginLeft:px2dp(100)}}>
            <ImageButton
              onPress={() => this._openModal()}
              icon="md-search"
              color="white"
              imgSize={px2dp(25)}
              btnStyle={{width: px2dp(60), height: px2dp(60)}}/>
          </View>
        </View>
        <View style={{flex:1, marginBottom:px2dp(49)}}>
          <AllQuest user = {user}/>
        </View>
        <Modal style={[styles.modal, styles.myModal]}
               position={'center'}
               ref={'queryModal'}>
          <View style={styles.content}>
            {user.roleId === 4 ?
              employeeOpt
              : (user.roleId === 3 ? researcherOpt :
              <View>
                {employeeOpt}
                {researcherOpt}
              </View>)
            }
            <View style={styles.editView}>
              <TextInput underlineColorAndroid='transparent'
                         style={styles.edit}
                         placeholder='生产能力（吨位）' onChangeText={(productionCapacity) => this.setState({productionCapacity})}/>
            </View>
            <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
            <View style={styles.editView}>
              <TextInput underlineColorAndroid='transparent'
                         style={styles.edit}
                         placeholder='省份' onChangeText={(province) => this.setState({province})}/>
            </View>
            <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
            <View style={styles.editView1}>
              <DatePicker
                style={styles.datePicker}
                customStyles={{dateInput: {borderWidth: 0}, placeholderText: {fontSize: px2dp(14),
                  color: '#909090'}}}
                mode='datetime'
                date={this.state.creationTime}
                placeholder='请输入创建时间'
                format='YYYY-MM-DD HH:mm'
                confirmBtnText='确认'
                cancelBtnText='取消'
                iconSource={require('../image/calendar-clock.png')}
                onDateChange={(creationTime) => this.setState({creationTime})}/>
            </View>
            <View style={{height: 1/PixelRatio.get(), backgroundColor:'#c4c4c4'}}/>
            <View style={styles.editView1}>
              <DatePicker
                style={styles.datePicker}
                customStyles={{
                  dateInput: {borderWidth: 0},
                  placeholderText: {fontSize: px2dp(14), color: '#909090'}}}
                mode='datetime'
                date={this.state.submissionTime}
                placeholder='请输入提交时间'
                format='YYYY-MM-DD HH:mm'
                confirmBtnText='确认'
                cancelBtnText='取消'
                iconSource={require('../image/calendar-clock.png')}
                onDateChange={(submissionTime) => this.setState({submissionTime})}/>
            </View>
            <View style={{marginTop:px2dp(40), flexDirection:'row'}}>
              <View style={{width:px2dp(90)}} >
                <Button style={{width:px2dp(70)}} title='查询' onPress={() => this._queryByCondition()}/>
              </View>
              <View style={{width:px2dp(90), marginLeft:px2dp(110)}}>
                <Button title='取消' onPress={() => this.refs.queryModal.close()}/>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default connect(state => ({
  questionnaires:state.questionnaire['questionnaire']
}),dispatch => ({
  questAction:bindActionCreators(QuestAction, dispatch)
}), null, {withRef:true})(QuestionnaireFragment);

const styles = StyleSheet.create({
  container:{
    flex :1,
    backgroundColor:theme.pageBackgroundColor,
  },
  actionBar: {
    flexDirection:'row',
    alignItems:'center',
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:theme.pageBackgroundColor
  },
  myModal: {
    height: px2dp(400),
    width: px2dp(300),
    borderRadius:px2dp(7)
  },
  content:{
    marginTop:px2dp(20),
    height:px2dp(400),
    width:px2dp(290)
  },
  edit:{
    height: px2dp(40),
    fontSize: px2dp(14),
    backgroundColor: '#fff',
    paddingLeft:px2dp(8)
  },
  editView:{
    height: px2dp(48),
    backgroundColor:'white',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  editView1:{
    height: px2dp(48),
    backgroundColor:'white',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  datePicker:{
    width:px2dp(160)
  }
});