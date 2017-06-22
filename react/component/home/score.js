/**
 * Created by lifan on 2017/6/20.
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
    ListView,
    TouchableHighlight,
} from 'react-native';
import ScoreItem from '../items/score_item'
import Global from '../config/Global'


 const REQUEST_DATE_URL='http://query-api.8win.com/command/execute?command=200022&calendarType=3&sportType=';
 const REQUEST_SCORE_URL='http://query-api.8win.com/command/execute?command=200015&matchDate=';

 class Score extends Component{



     constructor(props){
         super(props);
         this.state={
             loaded:false,
             // dataSourceDate:new ListView.DataSource({
             //     rowHasChanged:(row1,row2)=>row1 !== row2,
             // }),
             dataSourceMatch:new ListView.DataSource({
                 rowHasChanged:(row1,row2)=>row1 !== row2,
             }),
             stats:null,
         }
     }



    render(){
        if (!this.state.loaded) {
            //如果movies==null的情况 初始情况  渲染加载视图
            return this.renderLoadingView();
        }

        return(
            <View>
                {
                    <View style={[{flexDirection: 'row',height:30,}, styles.flex, styles.center]}>
                        <View style={{
                            backgroundColor: '#5bb4ff',
                            flex:2.5,
                            justifyContent:'center',
                            alignItems:'center',
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color:'white',
                            }}>共{this.state.stats.total}场比赛，{this.state.stats.ongoingCount}场进行中，{this.state.stats.futureCount}场未开赛</Text>
                        </View>
                        <TouchableHighlight style={{
                            backgroundColor: '#d9eeff',
                            flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                        }}
                        >
                            <Text style={[styles.center, {
                                fontSize: 12,
                                color:'#5bb4ff',
                            }]}>我的直播</Text>
                        </TouchableHighlight>
                    </View>
                }
                <ListView dataSource={this.state.dataSourceMatch}
                          renderRow={this.renderData}
                          style={styles.listView}/>
            </View>
        );
    }

    renderDate(){

    }

    renderData(score){
        return(
            <ScoreItem scoreItem={score}/>
        );
    }

     renderLoadingView() {
         return (
             <View style={styles.container}>
                 <Text>
                     正在网络上获取比分数据……
                 </Text>
             </View>
         );
     }



    componentDidMount(){
        this.fetchDate(1);
        // this._fetchScoreData();
        // Global.timerScore = setInterval(this._fetchScoreData, 10000);
    }

     componentWillUnmount(){
        // clearInterval(Global.timerScore);
     }


     /**
      * 请求足篮球比分
      * type  1 - 足球  2 - 篮球
      */
    fetchDate(type){
         fetch(REQUEST_DATE_URL+type)
             .then((response)=>response.json())
             .then((responseData)=>{
                 this._fetchScoreData(responseData.data.displayDay);
             })
             .done();

    }

     _fetchScoreData(date) {
        fetch(REQUEST_SCORE_URL+date)
            .then((response)=>response.json())
            .then((responseData)=>{
                var future:[] = responseData.data.future;
                var ongoing:[] = responseData.data.ongoing;
                var history:[] = responseData.data.history;
                var scoreItem  = null;
                if(history.length>0){
                    scoreItem = new ScoreItemBean();
                    scoreItem.type = 3;
                    scoreItem.historyCount = history.length;
                }
                var matchs = future.concat(ongoing,scoreItem,history);
                this.setState({
                    dataSourceMatch:this.state.dataSourceMatch.cloneWithRows(matchs),
                    loaded:true,
                    stats:responseData.data.stats,
                });
            })
            .done();
     }
 }

 class ScoreItemBean {

 }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listView: {
        backgroundColor: '#ffffff',
    },
    thumbnail: {
        width: 53,
        height: 81,

    },
    //让rightContainer在父容器中占据Image之外剩下的全部空间。

    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },



});

module.exports=Score;