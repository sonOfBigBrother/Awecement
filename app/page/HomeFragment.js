/**
 * 首页
 * Created by David Xie on 2017/4/16.
 */
import React from 'react';
import {View, Text, StyleSheet, Platform, ListView} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
// import {SwipeListView} from 'react-native-swipe-list-view';
// import httpUtil from '../util/httpUtil';
// import Service from '../util/Service';
import {connect} from 'react-redux';

class HomeFragment extends React.Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      isRefresh:false,
      dataSource:ds.cloneWithRows(this._getData)
    };
  }
  _getData(){

  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.actionBar}>
          <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize}}>首页</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  actionBar: {
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
  },
});
export default connect()(HomeFragment);