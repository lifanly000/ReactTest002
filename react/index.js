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
    Navigator,
} from 'react-native';
import assign from 'object-assign';
import CommonStyles from './css/common';



function btnClick() {
    alert("hello world !")
}


class Splash extends Component{



    render(){
        const {navigate} = this.props.navigation;
        return(
            <ViewPagerAndroid
                style = {[styles.viewPager,styles.center]}
                initialPage={0}
            >
                <View style = {styles.pageStyle}>
                    <Image source={require('./images/welcome1.png')} style={styles.imageLocal} resizeMode='contain'/>
                </View>
                <View style = {styles.pageStyle}>
                    <Image source={require('./images/welcome2.png')} style={styles.imageLocal} resizeMode='contain'>
                        <View style = {styles.myButton}>
                            <Button  title='立即进入' color='red' onPress={()=>navigate('Main', null)}/>
                        </View>
                    </Image>

                </View>
            </ViewPagerAndroid>
        )
    }

}




const styles = StyleSheet.create(assign(
    CommonStyles,

));

module.exports=Splash;