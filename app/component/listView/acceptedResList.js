/**
 * Created by David Xie on 2017/4/28.
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
import Commit from '../../page/Commit';
import computeTime from '../../util/timeUtil';

class AcceptedResearchList extends React.Component{
  static propTypes = {
    researches:PropTypes.array,
    resAction:PropTypes.object,
    user:PropTypes.object,
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
    this.props.resAction.getAcceptedForUser({roleId});
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
        this.props.user.roleId === 3 ?
        <TouchableHighlight onPress={() => this._commit(research)}>
          <View style={styles.row}>
            <View style={styles.rowTitle}>
              <Text style={styles.textTitle}>{research.title}</Text>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.bottomText} numberOfLines={1}>关于项目{research.project_name}</Text>
              <Text style={styles.bottomText} numberOfLines={1}>发布于{computeTime(research.received_time)}</Text>
            </View>
          </View>
        </TouchableHighlight>
          :
          <View style={styles.row}>
            <View style={styles.rowTitle}>
              <Text style={styles.textTitle}>{research.title}</Text>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.bottomText} numberOfLines={1}>关于项目{research.project_name}</Text>
              <Text style={styles.bottomText} numberOfLines={1}>确认于{computeTime(research.received_time)}</Text>
            </View>
          </View>
      );
    }
  }

  _commit(research){
    this.props.router.push({component:Commit}, {research});
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
          scrollRenderAheadDistance={ 150 }
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
    padding:px2dp(10)
  },
  textTitle:{
    color: '#000',
    fontSize: px2dp(18),
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: px2dp(3),
    marginLeft:px2dp(10),
    marginRight:px2dp(5)
  },
  bottomText:{
    fontSize: px2dp(11),
    color: theme.grayColor
  }
});
export default connect(state => ({
  researches:state.research['research']
}),dispatch => ({
  resAction:bindActionCreators(ResearchAction, dispatch)
}), null, {withRef:true})(AcceptedResearchList);

