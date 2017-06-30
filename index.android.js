/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MainPage from './react/component/main'
import Splash from './react'
import MatchDetail from './react/component/detail/match_detail'
import {
    StackNavigator,
} from 'react-navigation';

function initConfigStack(name) {
    return name;
}

const App = StackNavigator({
    Main:{screen:MainPage},
    Splash:{screen:Splash},
    MatchDetail:{screen:MatchDetail},
},{
    initialRouteName:initConfigStack('Splash'),
    mode:'card',
    navigationOptions: ({navigation}) => ({
        header:null
    })
});

AppRegistry.registerComponent('ReactTest002', () => MainPage);
