/**
 * Created by lifan on 2017/6/21.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

class TeamItem extends Component{
    render(){
        var imgUrl = this.props.imgUrl;
        var teamName = this.props.teamName;
        return(
            <View style = {styles.container}>
                <Image style={styles.img} source={{uri:imgUrl}}/>
                <Text style={styles.text}>{teamName}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
       flex:1,
       justifyContent:'center',
       alignItems:'center',
    },

    img:{
        width:40,
        height:40,
    },

    text:{
        fontSize:14,
        marginTop:5,
        color:'#333333'
    }

});

module.exports=TeamItem;
