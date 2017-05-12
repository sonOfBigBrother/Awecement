/**
 * Created by David Xie on 2017/4/28.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Platform,
  ScrollView,
  TextInput
} from 'react-native';
import {
  Cell,
  Section,
  TableView
} from 'react-native-tableview-simple';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import Toast from '@remobile/react-native-toast';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ResAction from '../action/research';
import ImageButton from '../component/ImageButton';
import moment from 'moment';
import Modal from 'react-native-modalbox';
import TimerMixin from 'react-timer-mixin';

class Confirm extends React.Component{
  static propTypes = {
    research:React.PropTypes.object,
    resAction:React.PropTypes.object,
    router:React.PropTypes.object,
    user:React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      rejectedReason:''
    };
  }

  componentWillUnMount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
  }

  _accept(id) {
    const {resAction, router} = this.props;
    resAction.accept({
      id,
      resolved:(data) => {
        if (data.code == 200){
          Toast.show('接受任务');
          this.timer = TimerMixin.setTimeout(() => {
            router.pop();
          }, 3000);
        }
      },
      rejected:(data) => {
        if (data){
          Toast.show('操作失败');
        }
      }
    });
  }

  _openModal(){
    this.refs.myModal.open();
  }
  _refuse(id){
    const {resAction, router} = this.props;
    resAction.refuse({
      id,
      rejectedReason:this.state.rejectedReason,
      resolved:(data) => {
        if (data.code == 200){
          Toast.show('拒绝任务');
          this.timer = TimerMixin.setTimeout(() => {
            router.pop();
          }, 3000);
        }
      },
      rejected:(data) => {
        if (data){
          Toast.show('操作失败');
        }
      }
    });
  }

  _handleBack() {
    this.props.router.pop();
  }

  render(){
    const {research, user} = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.actionBar}>
          <ImageButton
            onPress={this._handleBack.bind(this)}
            icon="md-arrow-back"
            color="white"
            imgSize={px2dp(25)}
            btnStyle={{width: px2dp(55), height: px2dp(60)}}/>
          <Text style={styles.actionBarTitle}>详情</Text>
        </View>
        <ScrollView>
          <TableView>
            <Section footer={research.title}>
              <Cell title='标题' onPress={false}/>
            </Section>
            <Section footer={research.target}>
              <Cell title='调查对象' onPress={false}/>
            </Section>
            <Section footer={research.location}>
              <Cell title='调查地点' onPress={false}/>
            </Section>
            <Section footer={moment(research.start_date).format('YYYY-MM-DD')}>
              <Cell title='开始日期' onPress={false}/>
            </Section>
            <Section footer={moment(research.end_date).format('YYYY-MM-DD')}>
              <Cell title='结束日期' onPress={false}/>
            </Section>
            <Section footer={moment(research.creation_time).format('YYYY-MM-DD HH:mm:ss')}>
              <Cell title='发布时间' onPress={false}/>
            </Section>
            {user.roleId === 2 ?
              <Section footer={research.receiver}>
                <Cell title='接收人' onPress={false}/>
              </Section>:
              <Section footer={research.publisher}>
                <Cell title='发布人' onPress={false}/>
              </Section>}
          </TableView>
          { user.roleId === 3 ?
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:px2dp(10), marginBottom:px2dp(10)}}>
              <View style={styles.acceptedButton}>
                <Button title="接受" onPress={() => this._accept(research.id)}/>
              </View>
              <View style={styles.rejectedButton}>
                <Button color='red' title="拒绝" onPress={() => this._openModal()}/>
              </View>
            </View> :
            null
          }
          <Modal style={[styles.modal, styles.myModal]}
                 position={'center'}
                 ref={'myModal'}>
            <View style={styles.content}>
              <View style={styles.editView}>
                <TextInput underlineColorAndroid='transparent'
                           placeholder='请输入拒绝的理由' onChangeText={(rejectedReason) => this.setState({rejectedReason})}/>
              </View>
              <View style={{marginTop:px2dp(90), flexDirection:'row'}}>
                <View style={{width:px2dp(90)}} >
                  <Button style={{width:px2dp(70)}} title='确认' onPress={() => this._refuse(research.id)}/>
                </View>
                <View style={{width:px2dp(90), marginLeft:px2dp(110)}}>
                  <Button title='取消' onPress={() => this.refs.myModal.close()}/>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.pageBackgroundColor
  },
  actionBar: {
    flexDirection:'row',
    alignItems:'center',
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
  },
  actionBarTitle:{
    color: theme.actionBar.fontColor,
    fontSize: px2dp(18),
    paddingLeft:px2dp(108)
  },
  acceptedButton:{
    width:px2dp(150),
    paddingLeft:px2dp(10)
  },
  rejectedButton:{
    width:px2dp(150),
    paddingRight:px2dp(10)
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:theme.pageBackgroundColor
  },
  myModal: {
    height: px2dp(250),
    width: px2dp(300),
    borderRadius:px2dp(7)
  },
  content:{
    marginTop:px2dp(20),
    height:px2dp(200),
    width:px2dp(290)
  },
  editView:{
    height: px2dp(48),
    backgroundColor:'white',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
});
export default connect(null,dispatch => ({
  resAction:bindActionCreators(ResAction, dispatch)
}), null, {withRef:true})(Confirm);