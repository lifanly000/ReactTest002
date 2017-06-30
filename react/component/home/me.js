/**
 * Created by lifan on 2017/6/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ViewPagerAndroid,
    Image,
    Button,
    NativeModules,
    DeviceEventEmitter,
} from 'react-native';
import FocusedTextView from '../native_view/focused_textview';

class Me extends Component {


    componentWillMount(){
        DeviceEventEmitter.addListener('AndroidToRNMessage',this.handleAndroidMessage);
    }

    componentWillunMount(){
        DeviceEventEmitter.remove('AndroidToRNMessage',this.handleAndroidMessage);
    }


    handleAndroidMessage=(msg)=>{
        console.log(msg);
    }



    render() {
        return (
            <View style = {styles.container}>
                <FocusedTextView style={{ width: 300, height: 30, marginTop: 10 }}/>
                <Text style={styles.welcome} onPress={this.callAndroid}>RN与Android的通信</Text>
            </View>
        );
    }

    callAndroid=()=>{
        NativeModules.MyNativeModule.rnCallNative('rn调用原生模块的方法-成功啦');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = Me;