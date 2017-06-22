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
    Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const REQUEST_URL="http://query-api.8win.com/command/execute?command=200030";

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            swipeShow:false,
            banners:null,
        }
    }

    render(){
        if(!this.state.banners){
            return this.renderLoadingView();
        }
        return this.renderBanner(this.state.banners);
    }

    componentDidMount(){
        this._fetchData();
    }

    renderLoadingView(){
        return (
            <View style={styles.slide3}>
                  <Text style={styles.text}>Loading...</Text>
            </View>
        );
    }

    renderBanner(banners){
        return(
            <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
                {banners.map((item,i)=>this.renderBannerItem(item,i))}
            </Swiper>
        );
    }

    renderBannerItem(item, i) {
        return(
            <View style={styles.slide1} key={i}>
               <Image style={styles.bannerImg}
                      resizeMode='stretch'
                     source={{uri:item.imageUrl}}
               >
                   {/*<Text style={styles.text}>第{i}张图片</Text>*/}
               </Image>

            </View>
        );
    }

    _fetchData(){
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseJson) => {
                //noinspection JSAnnotator
                this.setState({
                    banners : responseJson.data.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


}

const styles = StyleSheet.create({
    wrapper: {
        height:300,
    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height:200,
    },
    slide2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
        height:200,
    },
    slide3: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
        height:200,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    bannerImg:{
        height:200,
        width:Width,
        padding:0,
    }
});

module.exports = Home;