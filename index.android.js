import React from 'react';
import {AppRegistry} from 'react-native';
import Navigation from './app/entry';
export default class AweCement extends React.Component{
  render(){
    return (
      <Navigation/>
    );
  }
}
AppRegistry.registerComponent('AweCement', () => AweCement);
