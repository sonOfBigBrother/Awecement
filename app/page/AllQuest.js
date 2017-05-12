/**
 * Created by David Xie on 2017/4/26.
 */
import React,{Component, PropTypes} from 'react';
import {ListView,
  View,
  StyleSheet,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import * as QuestAction from '../action/questionnaire';
import { bindActionCreators } from 'redux';
import computeTime from '../util/timeUtil';

class AllQuest extends Component{
  static propTypes = {
    questionnaires:PropTypes.any,
    questAction:PropTypes.object,
    user:PropTypes.object
  };

  constructor(props){
    super(props);
    let dataSource = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      dataSource:dataSource.cloneWithRows(props.questionnaires||{})
    };
  }

  componentDidMount() {
    this.fetchData(this.props.user.roleId);
  }

  fetchData(roleId){
    this.props.questAction.getQuestionnaireForUser({roleId});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questionnaires && nextProps.questionnaires.length
      && nextProps.questionnaires != this.props.questionnaires){
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(nextProps.questionnaires)
      });
    }
  }

  renderListRow(questionnaire){
    if(questionnaire && questionnaire.id){
      return(
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <Text style={styles.textTitle}>{questionnaire.title}</Text>
          </View>
          <View style={styles.production}>
            <Text>生产能力（吨位）：{questionnaire.production_capacity}</Text>
            <Text>省份：{questionnaire.province}</Text>
          </View>
          <View style={styles.person}>
            <Text>受邀人：{questionnaire.receiver}</Text>
            <Text>邀请人：{questionnaire.inviter}</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText} numberOfLines={1}>关于项目{questionnaire.project_name}</Text>
            <Text style={styles.bottomText} numberOfLines={1}>发布于{computeTime(questionnaire.creation_time)}</Text>
            <Text style={styles.bottomText} numberOfLines={1}>提交于{computeTime(questionnaire.submission_time)}</Text>
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
  },
  production:{
    marginLeft:px2dp(10),
    marginRight:px2dp(5),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  person:{
    marginLeft:px2dp(10),
    marginRight:px2dp(5),
    flexDirection:'row',
    justifyContent: 'space-between',
  }
});
export default connect(state => ({
  questionnaires:state.questionnaire['questionnaire']
}),dispatch => ({
  questAction:bindActionCreators(QuestAction, dispatch)
}), null, {withRef:true})(AllQuest);