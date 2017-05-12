/**
 * Created by David Xie on 2017/4/23.
 */
import React,{Component, PropTypes} from 'react';
import {ListView,
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import theme from '../../config/theme';
import px2dp from '../../util/px2dp';
import * as MsgAction from '../../action/message';
import { bindActionCreators } from 'redux';
import MsgDetail from '../../page/MsgDetail';
import computeTime from '../../util/timeUtil';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class MsgList extends Component{
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
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props.user.roleId);
  }

  fetchData(roleId){
    const {msgAction} = this.props;
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

  _showDetail(message){
    const {user} = this.props;
    this.props.router.push({component:MsgDetail},{message, user});
  }

  renderListRow(message){
    if(message && message.id){
      return(
        <TouchableHighlight onPress={() => this._showDetail(message)}>
          <View style={styles.row}>
            <View style={styles.rowTitle}>
              <Text style={styles.textTitle}>{message.msg_title}</Text>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.bottomText} numberOfLines={1}>关于项目{message.project_name}</Text>
              <Text style={styles.bottomText} numberOfLines={1}>发布于{computeTime(message.creation_time)}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
  }

  render(){
    return(
      <ListView ref = {(view) => this.listView = view}
                removeClippedSubviews = {true}
                enableEmptySections = { true }
                onEndReachedThreshold={ 10 }
                initialListSize={10}
                pageSize={10}
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
    padding:px2dp(10)
  },
  textTitle:{
    color: '#000',
    fontSize: px2dp(18),
  },
  bottomText:{
    fontSize: px2dp(11),
    color: theme.grayColor
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: px2dp(3),
    marginLeft:px2dp(10),
    marginRight:px2dp(5)
  }
});
export default connect(state => ({
  messages:state.message['messages']
}),dispatch => ({
  msgAction:bindActionCreators(MsgAction, dispatch)
}), null, {withRef:true})(MsgList);