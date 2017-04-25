/**
 * Created by David Xie on 2017/4/13.
 */
import React from 'react';
import {Navigator} from 'react-native';
import LoginPage from './page/Login';
import Router from './config/router';
import {connect} from 'react-redux';

class Navigation extends React.Component{
  constructor(props){
    super(props);
  }

  renderScene(route, navigator){
    this.router = this.router || new Router(navigator);
    let Component = route.component;
    if (Component){
      return <Component {...route.props}
                        navigator = {navigator}
                        router = {this.router}
                        ref = {(page) => route.sceneRef = page}/>;
    }
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

  onDidFocus(route){
    if(route.sceneRef.getWrappedInstance){
      const wrappedComponent = route.sceneRef.getWrappedInstance();
      if(wrappedComponent){
        wrappedComponent.componentDidFocus &&
        wrappedComponent.componentDidFocus();
      }
    }
    route.sceneRef.componentDidFocus &&  route.sceneRef.componentDidFocus();
  }

  render(){
    return(
      <Navigator
        initialRoute={{component: LoginPage, name:'login'}}
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)}
        onDidFocus={this.onDidFocus.bind(this)}/>
    );
  }
}

export default connect(state => ({user: state.user})
  ,null, null, {withRef: true})(Navigation);

