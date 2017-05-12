/**
 * Created by David Xie on 2017/4/26.
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
import * as ResAction from '../../action/research';
import { bindActionCreators } from 'redux';
import computeTime from '../../util/timeUtil';
import Confirm from '../../page/Confirm';

class ResearchList extends Component{
  static propTypes = {
    researches:PropTypes.array,
    resAction:PropTypes.object,
    user:PropTypes.object,
    router:PropTypes.object,
    flag:PropTypes.number
  };

  constructor(props){
    super(props);
    console.log(props.researches);
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

  _checkDetail(research) {
    const {user, router} = this.props;
    router.push({component:Confirm},{research, user});
  }


  renderListRow(research){
    if(research && research.id){
      return(
      <TouchableHighlight onPress={() => this._checkDetail(research)}>
        <View style={styles.row}>
          <View style={styles.rowTitle}>
            <Text style={styles.textTitle}>{research.title}</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText} numberOfLines={1}>关于项目{research.project_name}</Text>
            <Text style={styles.bottomText} numberOfLines={1}>发布于{computeTime(research.creation_time)}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
    marginRight:px2dp(5 )
  },
  bottomText:{
    fontSize: px2dp(11),
    color: theme.grayColor
  }
});
export default connect(state => ({
  researches:state.research['research']
}),dispatch => ({
  resAction:bindActionCreators(ResAction, dispatch)
}), null, {withRef:true})(ResearchList);