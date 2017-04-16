/**
 * Created by David Xie on 2017/4/13.
 */
import React from 'react';
import {Navigator} from 'react-native';
import LoginPage from './page/Login';
export default class Navigation extends React.Component{
  render(){
    return(
      <Navigator
        initialRoute={{component: LoginPage}}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} {...route.args}/>;
        }
        }/>
    );
  }
}