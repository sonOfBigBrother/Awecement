/**
 * Created by David Xie on 2017/5/9.
 */
import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import px2dp from '../util/px2dp';

export default class Spinner extends Component {
  static propTypes = {
    style:React.PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[ styles.m_a_4, this.props.style ]}>
        <ActivityIndicator
          animating  = { true }
          size = { 'large' }
          color={ '#c0cdd8'}
          {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  m_a_4:{
    margin: px2dp(20)
  }
});