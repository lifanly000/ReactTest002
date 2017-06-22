/**
 * Created by lifan on 2017/6/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ViewPagerAndroid,
    Image,
    Button,
} from 'react-native';
import assign from 'object-assign';
import CommonStyles from '../css/common';
import {
    StackNavigator,TabNavigator
} from 'react-navigation';
import Home from './home/home'
import News from './home/news'
import Score from './home/score'
import Me from './home/me'
import Guess from './home/guess'






const styles = StyleSheet.create({
    icon: {
        width: 29,
        height: 25,
    },
});

const MainPage = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions:{
            tabBarLabel: '大厅',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/home_lobby.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },
    Guess: {
        screen: Guess,
        navigationOptions:{
            tabBarLabel: '竞猜',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/home_guess.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },
    News: {
        screen: News,
        navigationOptions:{
            tabBarLabel: '爆料',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/home_news.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },
    Score: {
        screen: Score,
        navigationOptions:{
            tabBarLabel: '比分',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/home_score.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },
    Me: {
        screen: Me,
        navigationOptions:{
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/home_me.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },
}, {
    initialRouteName:'Score',
    animationEnabled:false,//切换页面时是否有动画效果
    tabBarPosition:'bottom',// 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled:false,// 是否可以左右滑动切换tab
    backBehavior:'none',// 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#ff0000', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            height: 54
        },
        labelStyle: {
            fontSize: 10, // 文字大小
            marginTop:2
        },
    },
});

module.exports = MainPage;