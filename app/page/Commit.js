/**
 * Created by David Xie on 2017/4/28.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  Platform,
  Image,
  ScrollView
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
import ImagePicker from 'react-native-image-picker';
import ImageButton from '../component/ImageButton';
import TimerMixin from 'react-timer-mixin';


const options = {
  title: '选择图片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  mediaType: 'photo',
  videoQuality: 'high',
  durationLimit: 10,
  maxWidth: 600,
  maxHeight: 600,
  aspectX: 2,
  aspectY: 1,
  quality: 0.8,
  angle: 0,
  allowsEditing: false,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class Commit extends React.Component{
  static propTypes = {
    research:React.PropTypes.object,
    resAction:React.PropTypes.object,
    router:React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      avatarSource:require('../image/user.png'),
      imgFileName:'',
      content:''
    };
  }

  componentWillUnMount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
  }

  _upload(){
    ImagePicker.showImagePicker(options, (response)=> {
      if (response.didCancel) {
        Toast.show('User cancelled image picker');
      }
      else if (response.error) {
        Toast.show('ImagePicker Error: ', response.error);
      }
      else {
        let source = {};
        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', '')};
        } else {
          source = {uri: response.uri};
        }
        this.setState({
          avatarSource:source,
          imgFileName:response.fileName
        });
      }
    });
  }

  _commit(){
    let formData = new FormData();
    formData.append('content',this.state.content);
    formData.append('id', this.props.research.id);
    formData.append('file',{uri:this.state.avatarSource.uri,
      type:'image/jpg',
      name:this.state.imgFileName});
    this.props.resAction.commitResearch({
      data:formData,
      resolved:(data) => {
        if (data.code == 200){
          Toast.show('提交成功');
          this.timer = TimerMixin.setTimeout(() => {
            this.props.router.pop();
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
    const {research} = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.actionBar}>
          <ImageButton
            onPress={this._handleBack.bind(this)}
            icon="md-arrow-back"
            color="white"
            imgSize={px2dp(25)}
            btnStyle={{width: px2dp(55), height: px2dp(60)}}/>
          <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize, paddingLeft:px2dp(90)}}>提交数据</Text>
        </View>
        <ScrollView style={styles.form}>
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
          </TableView>
          <View style={styles.editView2}>
            <Text style={{color:'#000'}}>文本内容：</Text>
            <TextInput style={styles.edit}
                       underlineColorAndroid='transparent'
                       multiline={true}
                       numberOfLines={5}
                       onChangeText={(content) => this.setState({content})}/>
          </View>
          <Image source={this.state.avatarSource}/>
          <View>
            <View style={{marginTop: px2dp(10)}}>
              <Button title="上传" onPress={() => this._upload()}/>
            </View>
          </View>
          <View>
            <View style={{marginTop: px2dp(10)}}>
              <Button title="提交" onPress={() => this._commit()}/>
            </View>
          </View>
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
  actionBar:{
    flexDirection:'row',
    alignItems:'center',
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
  },
  form:{
    borderWidth:px2dp(1),
    borderColor:'#f4f4f4'
  },
  editView2:{
    marginTop:px2dp(10)
  },
  edit:{
    height: px2dp(40),
    fontSize: px2dp(15),
    backgroundColor: '#fff',
    marginTop:px2dp(8),
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10)
  },
});
export default connect(null,dispatch => ({
  resAction:bindActionCreators(ResAction, dispatch)
}), null, {withRef:true})(Commit);