/**
 * Created by David Xie on 2017/4/28.
 */
import React,{PropTypes} from 'react';
import {ListView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import theme from '../../config/theme';
import px2dp from '../../util/px2dp';
import { bindActionCreators } from 'redux';
import * as ResearchAction from '../../action/research';
import computeTime from '../../util/timeUtil';

class RejectedResearchList extends React.Component{
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
    this.props.resAction.getRefusedForUser({roleId});

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
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <Text style={styles.textTitle}>{research.title}</Text>
          </View>
          <View style={styles.reason}>
            <Text>拒绝理由:{research.rejected_reason}</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText} numberOfLines={1}>关于项目{research.project_name}</Text>
            <Text style={styles.bottomText} numberOfLines={1}>确认于{computeTime(research.received_time)}</Text>
          </View>
        </View>
      );
    }
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
    padding:px2dp(5)
  },
  textTitle:{
    color: '#000',
    fontSize: px2dp(18),
  },
  reason:{
    padding:px2dp(5)
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: px2dp(3),
    marginLeft:px2dp(5),
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
}), null, {withRef:true})(RejectedResearchList);

