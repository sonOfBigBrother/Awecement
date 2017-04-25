/**
 * Created by David Xie on 2017/4/16.
 */
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../util/px2dp';
import HomeFragment from '../page/HomeFragment';
import InvestigationFragment from '../page/InvestigationFragment';
import MeFragment from '../page/MeFragment';
import QuestionnaireFragment  from '../page/QuestionnaireFragment';

export default class TabBar extends React.Component{
  static propTypes = {
    navigator:React.PropTypes.any,
    selectedColor:React.PropTypes.string,
    normalColor:React.PropTypes.string,
    user:React.PropTypes.object,
    router:React.PropTypes.object
  };

  static defaultProps = {
    selectedColor: '#1683fb',
    normalColor: '#a9a9a9'
  };

  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'home',
      tabName: ['首页','调查','问卷','我'],
    };
  }

  render(){
    const {user} = this.props;
    const {selectedColor} = this.props;
    const {tabName} = this.state;
    return(
      <TabNavigator
        hidesTabTouch={true}
        tabBarStyle={styles.tabBar}
        sceneStyle={{ paddingBottom: styles.tabBar.height }}>
        <TabNavigator.Item
          tabStyle={styles.tabStyle}
          title={tabName[0]}
          selected={this.state.selectedTab === 'home'}
          selectedTitleStyle={{color: selectedColor}}
          renderIcon={() => <Image style={styles.tab} source={this.state.homeNormal} />}
          renderSelectedIcon={() => <Image style={styles.tab} source={this.state.homeSelected} />}
          onPress={() => this.setState({ selectedTab: 'home' })}>
          {<HomeFragment navigator={this.props.navigator} user = {user} router = {this.props.router}/>}
        </TabNavigator.Item>
        { user.roleId == 4 ? null:
          <TabNavigator.Item
            tabStyle={styles.tabStyle}
            title={tabName[1]}
            selected={this.state.selectedTab === 'compass'}
            selectedTitleStyle={{color: selectedColor}}
            renderIcon={() => <Image style={styles.tab} source={this.state.compassNormal} />}
            renderSelectedIcon={() => <Image style={styles.tab} source={this.state.compassSelected} />}
            onPress={() => this.setState({ selectedTab: 'compass' })}>
            {<InvestigationFragment />}
          </TabNavigator.Item>
        }
        <TabNavigator.Item
          tabStyle={styles.tabStyle}
          title={tabName[2]}
          selected={this.state.selectedTab === 'questionnaire'}
          selectedTitleStyle={{color: selectedColor}}
          renderIcon={() => <Image style={styles.tab} source={this.state.questionnaireNormal} />}
          renderSelectedIcon={() => <Image style={styles.tab} source={this.state.questionnaireSelected} />}
          onPress={() => this.setState({ selectedTab: 'questionnaire' })}>
          {<QuestionnaireFragment/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.tabStyle}
          title={tabName[3]}
          selected={this.state.selectedTab === 'me'}
          selectedTitleStyle={{color: selectedColor}}
          renderIcon={() => <Image style={styles.tab} source={this.state.meNormal} />}
          renderSelectedIcon={() => <Image style={styles.tab} source={this.state.meSelected} />}
          onPress={() => this.setState({ selectedTab: 'me' })}>
          {<MeFragment user = {this.props.user} router={this.props.router}/>}
        </TabNavigator.Item>
      </TabNavigator>
    );
  }

  componentWillMount() {
    const {selectedColor, normalColor} = this.props;
    Icon.getImageSource('md-paper', 50, normalColor).then((source) => this.setState({ questionnaireNormal: source }));
    Icon.getImageSource('md-paper', 50, selectedColor).then((source) => this.setState({ questionnaireSelected: source }));
    Icon.getImageSource('md-home', 50, normalColor).then((source) => this.setState({ homeNormal: source }));
    Icon.getImageSource('md-home', 50, selectedColor).then((source) => this.setState({ homeSelected: source }));
    Icon.getImageSource('md-person', 50, normalColor).then((source) => this.setState({ meNormal: source }));
    Icon.getImageSource('md-person', 50, selectedColor).then((source) => this.setState({ meSelected: source }));
    Icon.getImageSource('md-compass', 50, normalColor).then((source) => this.setState({ compassNormal: source }));
    Icon.getImageSource('md-compass', 50, selectedColor).then((source) => this.setState({ compassSelected: source }));
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: px2dp(49),
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  tabStyle:{
    padding: px2dp(1)
  },
  tab: {
    width: px2dp(22),
    height: px2dp(22)
  }
});