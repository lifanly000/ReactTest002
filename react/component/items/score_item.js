/**
 * Created by lifan on 2017/6/20.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio,
    ART,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';
import TeamItem from './team_item';
const {Surface,Group,Shape,Path} =ART;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class ScoreItem extends Component{

    onPressCallback (scoreItem) {
        // const {navigate} = this.props.navigation;
        // navigate('MatchDetail', null);
        ToastAndroid.show(scoreItem.matchId, ToastAndroid.SHORT);
    };

    render(){
        var scoreItem = this.props.scoreItem;
        if(scoreItem==null){
            return null;
        }
        const path = Path().lineTo(width,0);
        const path2 = Path().moveTo(0,10).lineTo(0,90);
        if(scoreItem.type !=null && scoreItem.type == 3){
            return(
                <View style ={{height:30,backgroundColor:'#e5e5e5',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:12,color:'#333333',}}>{scoreItem.historyCount}场比赛已经结束</Text>
                </View>
            );
        }
        return(
            <TouchableHighlight underlayColor={'#f5f5f5'}
                                onPress={()=>this.onPressCallback(scoreItem)}>
                <View>
                    <View style={styles.container}>
                        <View style={styles.leftInfo}>
                            <Text style={styles.textLeft}>{scoreItem.matchNo}</Text>
                            <Text style={styles.textLeft}>{scoreItem.leagueName}</Text>
                            <Text style={styles.textLeft}>{scoreItem.saleEndTime.substr(11,5)} 截止</Text>

                        </View>
                        <View style = {styles.middleLine}>
                            <Surface width = {2} height = {100}>
                                <Shape d = {path2} stroke = "#bebebe" strokeWidth={1} strokeDash={[10,5]}/>
                            </Surface>
                        </View>
                        <View style={styles.rightInfo}>
                            <View style = {[styles.flex,styles.center]}>
                                <TeamItem imgUrl={scoreItem.homeLogo} teamName={scoreItem.homeName}/>
                            </View>
                            <View style = {[styles.flex,styles.center]}>
                                {this.renderMatchInfo(scoreItem)}
                            </View>
                            <View style = {[styles.flex,styles.center]}>
                                <TeamItem imgUrl={scoreItem.awayLogo} teamName={scoreItem.awayName}/>
                            </View>
                        </View>
                    </View>
                    {scoreItem.matchStatus=='6'?this.renderMatchResult(scoreItem):null}
                    <Surface width = {width} height = {1}>
                        <Shape d = {path} stroke = "#bebebe" strokeWidth={1} />
                    </Surface>
                </View>
            </TouchableHighlight>
        );
    }


    /**
     * 判断比赛状态来显示不同界面
     * @param scoreItem
     * @returns {XML}
     */
    renderMatchInfo(scoreItem) {
        if(scoreItem.matchStatus == '1'){
            //未开赛
            return (
                <View style={[styles.flex,styles.center]}>
                    <Text style={styles.textLeft}>{scoreItem.matchBeginTime.substr(11,5)}开赛</Text>
                </View>
            );
        }else if(scoreItem.matchStatus == '6'){
            //完赛
            return(
                <View style={[styles.flex,styles.center]}>
                    <Text style={styles.textLeft}>{scoreItem.matchBeginTime.substr(11,5)}</Text>
                    <Text style={{fontSize:24,color:'#333333'}}>{scoreItem.homeGoals} - {scoreItem.awayGoals}</Text>
                    <Text style={styles.textLeft}>半场 {scoreItem.homeHalfGoals}-{scoreItem.awayHalfGoals}</Text>
                </View>
            );
        }else if(scoreItem.matchStatus == '4'){
            //比赛中
            return(
                <View style={[styles.flex,styles.center]}>
                    <Text style={styles.textMatchGoingTime}>{scoreItem.durationTime}'</Text>
                    <Text style={{fontSize:24,color:'#333333'}}>{scoreItem.homeGoals} - {scoreItem.awayGoals}</Text>
                    <Text style={styles.textLeft}>半场 {scoreItem.homeHalfGoals}-{scoreItem.awayHalfGoals}</Text>
                </View>
            );
        }

    }

    /**
     * 完场比赛 赛果信息
     * @param scoreItem
     */
    renderMatchResult(scoreItem) {
        return(
            <View style = {{flex:1,marginBottom:10}}>
                <View style ={styles.resultContainer}>
                    <View style = {[styles.flex,styles.lineRight]}>
                        <View style = {[styles.flex,styles.center,styles.lineCenter]}>
                            <Text style={styles.font}>胜平负</Text>
                        </View>
                        <View style = {[styles.flex,styles.center]}>
                            <Text style={styles.font}>{this.resultDataParse(0,scoreItem.spfResult)}</Text>
                        </View>
                    </View>
                    <View style = {[styles.flex,styles.lineRight]}>
                        <View style = {[styles.flex,styles.center,styles.lineCenter]}>
                            <Text style={styles.font}>让球胜平负</Text>
                        </View>
                        <View style = {[styles.flex,styles.center,styles.row]}>
                            {scoreItem.let.startsWith('-')?
                                <Text style={{fontSize:12,color:'#ff0000'}}>{scoreItem.let}</Text>
                                :
                                <Text style={{fontSize:12,color:'#00ff00'}}>{scoreItem.let}</Text>}
                            <Text style={styles.font}>{this.resultDataParse(1,scoreItem.rqspfResult)}</Text>
                        </View>
                    </View>
                    <View style = {[styles.flex,styles.lineRight]}>
                        <View style = {[styles.flex,styles.center,styles.lineCenter]}>
                            <Text style={styles.font}>猜比分</Text>
                        </View>
                        <View style = {[styles.flex,styles.center]}>
                            <Text style={styles.font}>{scoreItem.bfResult}</Text>
                        </View>
                    </View>
                    <View style = {[styles.flex,styles.lineRight]}>
                        <View style = {[styles.flex,styles.center,styles.lineCenter]}>
                            <Text style={styles.font}>总进球数</Text>
                        </View>
                        <View style = {[styles.flex,styles.center]}>
                            <Text style={styles.font}>{scoreItem.jqsResult}球</Text>
                        </View>
                    </View>
                    <View style = {[styles.flex]}>
                        <View style = {[styles.flex,styles.center,styles.lineCenter]}>
                            <Text style={styles.font}>半全场</Text>
                        </View>
                        <View style = {[styles.flex,styles.center]}>
                            <Text style={styles.font}>{this.resultDataParse(2,scoreItem.bqcResult)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    /**
     *
     * @param type   0 - 胜平负  1-让球胜平负 2 - 半全场
     * @param value
     */
    resultDataParse(type,value){
        if(value.length<=0){
            return null;
        }
        if(type==2){
            return this.resultDataParse(0,value.split('-')[0])+'-'+this.resultDataParse(0,value.split('-')[1])
        }else if(type==0){
            if(value=='3'){
                return '胜';
            }else if(value == '1'){
                return '平';
            }else{
                return '负';
            }
        }else if(type==1){
            if(value=='3'){
                return '主胜';
            }else if(value == '1'){
                return '平局';
            }else{
                return '客胜';
            }
        }
    }




}

const styles = StyleSheet.create({
    flex:{
        flex:1,
    },
    row:{
        flexDirection:'row',
    },
    container:{
        width:width,
        height:100,
        marginLeft:10,
        marginRight:10,
        justifyContent:'center',
        flexDirection:'row',
    },
    leftInfo:{
        justifyContent:'center',
        alignItems:'center',
        width:80,
        flex:1,
    },
    rightInfo:{
        justifyContent:'center',
        alignItems:'center',
        flex:4,
        flexDirection:'row',
    },
    textLeft:{
        padding:2,
        fontSize:12,
        color:'#666666',
    },
    textMatchGoingTime:{
        padding:2,
        fontSize:12,
        color:'#00ff55',
    },
    middleLine:{
        width:2,
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
    },
    resultContainer:{
        flexDirection:'row',
        borderWidth:1/PixelRatio.get(),
        borderColor:'#999999',
        backgroundColor:'#fff',
        marginLeft:20,
        marginRight:20,
    },
    lineRight:{
        borderRightWidth:1/PixelRatio.get(),
        borderColor:'#999999',
    },
    lineCenter:{
        borderBottomWidth:1/PixelRatio.get(),
        borderColor:'#999999',
    },
    font:{
        color:'#999999',
        fontSize:12,
        padding:4,
    },

});


module.exports = ScoreItem;