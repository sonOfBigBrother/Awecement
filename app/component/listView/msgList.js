/**
 * Created by David Xie on 2017/4/23.
 */
import React,{Component, PropTypes} from 'react';
import {ListView,
  View,
  StyleSheet,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import theme from '../../config/theme';
import px2dp from '../../util/px2dp';
import * as MsgAction from '../../action/message';
import { bindActionCreators } from 'redux';

class MsgList extends Component{
  static propTypes = {
    messages:PropTypes.array,
    msgAction:PropTypes.object,
    user:PropTypes.object
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
  render(){
    return(
      <ListView ref = {(view) => this.listView = view}
                enableEmptySections = { true }
                onEndReachedThreshold={ 10 }
                initialListSize={ 10 }
                pageSize = { 10 }
                pagingEnabled={ false }
                scrollRenderAheadDistance={ 150 }
                dataSource={ this.state.dataSource }
                renderRow={ (e)=> this.renderListRow(e) }>

      </ListView>
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
  }
});
export default connect(state => ({
  messages:state.message['messages']
}),dispatch => ({
  msgAction:bindActionCreators(MsgAction, dispatch)
}), null, {withRef:true})(MsgList);