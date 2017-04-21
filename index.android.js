import React from 'react';
import {AppRegistry} from 'react-native';
import Navigation from './app/entry';
import {Provider} from 'react-redux';
import {Store} from './app/store';
import './app/util/storage';
export default class AweCement extends React.Component{
  render(){
    return (
      <Provider store = {Store}>
        <Navigation/>
      </Provider>
    );
  }
}
AppRegistry.registerComponent('AweCement', () => AweCement);
