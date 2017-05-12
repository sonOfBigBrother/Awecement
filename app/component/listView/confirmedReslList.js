/**
 * Created by David Xie on 2017/4/27.
 */
import React,{PropTypes} from 'react';
import {ListView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import theme from '../../config/theme';
import px2dp from '../../util/px2dp';
import { bindActionCreators } from 'redux';
import * as ResearchAction from '../../action/research';
import Confirm from '../../page/Confirm';

class ConfirmedResearchList extends React.Component{
  static propTypes = {
    researches:PropTypes.array,
    resAction:PropTypes.object,
    user:PropTypes.object,
    flag:PropTypes.number,
    router:PropTypes.object
  };

  constructor(props){
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      dataSource:dataSource.cloneWithRows(props.researches||{})
    };
  }

  componentDidMount() {
    this.fetchData(this.props.user.roleId);
  }

  fetchData(roleId){
    this.props.resAction.getResearchForUser(roleId);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.researches && nextProps.researches.length
      && nextProps.researches != this.props.researches){
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(nextProps.researches)
      });
    }
  }

  renderListRow(research){
    if(research && research.id){
      return(
        <View>
          <TouchableHighlight
            onPress={() => this.confirm(research)}
            style={styles.row}>
            <View>
              <View style={styles.rowTitle}>
                <Text>{research.title}</Text>
              </View>
              <View style={styles.rowContent}>
                <Text>{research.content}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

  confirm(research){
    this.props.router.push({component:Confirm}, {research});
  }

  render(){
    return(
    <View>
      <ListView
        ref = {(view) => this.listView = view}
        dataSource={this.state.dataSource}
        enableEmptySections = { true }
        onEndReachedThreshold={ 10 }
        initialListSize={ 10 }
        pageSize = { 10 }
        pagingEnabled={ false }
        renderRow={(e) => this.renderListRow(e)}/>
    </View>

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
  researches:state.research['research']
}),dispatch => ({
  resAction:bindActionCreators(ResearchAction, dispatch)
}), null, {withRef:true})(ConfirmedResearchList);

