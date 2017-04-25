/**
 * Created by David Xie on 2017/4/23.
 */
import React,{Component, PropTypes} from 'react';
import {ListView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import theme from '../../config/theme';
import px2dp from '../../util/px2dp';
import {SwipeListView} from 'react-native-swipe-list-view';
import * as MsgAction from '../../action/message';
import { bindActionCreators } from 'redux';
import UpdateMsg from '../../page/UpateMsg';

class MsgSwipeList extends Component{
  static propTypes = {
    messages:PropTypes.array,
    msgAction:PropTypes.object,
    user:PropTypes.object,
    router:PropTypes.object
  };

  constructor(props){
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      dataSource:dataSource.cloneWithRows(props.messages||{})
    };
  }

  componentDidMount() {
    this.fetchData(this.props.user.roleId);
  }

  fetchData(roleId){
    const{msgAction} = this.props;
    msgAction.getMsgForUser(roleId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages && nextProps.messages.length
      && nextProps.messages != this.props.messages){
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(nextProps.messages)
      });
    }
  }

  renderListRow(message){
    if(message && message.id){
      return(
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <Text>{message.msg_title}</Text>
          </View>
          <View style={styles.rowContent}>
            <Text>{message.msg_content}</Text>
          </View>
        </View>
      );
    }
  }

  deleteMsg(id){
    const {msgAction} = this.props;
    msgAction.deleteMsg(id);
  }

  updateMsg(message){
    this.props.router.push({component:UpdateMsg}, {message});
  }

  renderHiddenTouchable(message){
    if(message && message.id){
      return(
        <View style={styles.rowBack}>
          <TouchableHighlight
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => this.deleteMsg(message.id)}>
            <Text style={{color:'red'}}>删除</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.backRightBtn, styles.backRightBtnRight]}
                              onPress={() => this.updateMsg(message)}>
            <Text style={{color:'blue'}}>更新</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }

  render(){
    return(
      <SwipeListView
        ref = {(view) => this.listView = view}
        disableRightSwipe={true}
        dataSource={this.state.dataSource}
        enableEmptySections = { true }
        onEndReachedThreshold={ 10 }
        rightOpenValue={-150}
        initialListSize={ 10 }
        pageSize = { 10 }
        pagingEnabled={ false }
        renderRow={(e) => this.renderListRow(e)}
        renderHiddenRow={(e) => this.renderHiddenTouchable(e)}/>
    );
  }

}

const styles = StyleSheet.create({
  row:{
    padding:px2dp(5),
    borderWidth: px2dp(0.5),
    borderColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: theme.pageBackgroundColor
  },
  rowTitle: {
    marginBottom:px2dp(5)
  },
  rowContent:{
    marginBottom:px2dp(10)
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: px2dp(15)
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: px2dp(75)
  },
  backRightBtnLeft: {
    right: px2dp(75)
  },
  backRightBtnRight: {
    right: 0
  }
});
export default connect(state => ({
  messages:state.message['messages']
}),dispatch => ({
  msgAction:bindActionCreators(MsgAction, dispatch)
}), null, {withRef:true})(MsgSwipeList);