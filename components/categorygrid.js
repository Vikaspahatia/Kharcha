import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet, Platform,TouchableNativeFeedback} from 'react-native';
const Categorygrid = props =>{
    let TouchableComp;
    TouchableComp=TouchableOpacity;
    if(Platform.OS ==='android' && Platform.Version >= 21){
        TouchableComp=TouchableNativeFeedback;
    }
    return (
        <View style={styles.griditems}>
            <TouchableComp 
                style={{flex:1}}
                onPress={props.onSelect}>
                <View style={{...styles.container,...{backgroundColor:props.color}}}>
                    <Text style={styles.title} >{props.title}</Text>
                    <Text style={styles.title2} >{props.amount} ₹</Text>
                </View>
            </TouchableComp>
        </View>
    );
};

const styles= StyleSheet.create({
griditems:{
    flex:1,
    alignSelf: 'center',
    margin:13,
    height:90,
    width:'92%',
    borderRadius:10,
    overflow:Platform.OS === 'android' && Platform.Version >= 21 ?'hidden':'visible',
    elevation:5,
    shadowColor:'white',
    shadowOpacity:0.1,
    shadowOffset:{width:1,height:3},
    shadowRadius:10,
},
container:{
    flex:1,
    borderRadius:14,
    padding:15,
    justifyContent:'space-between',
    margin: 1
},
title:{
    fontSize:20,
    textAlign:'left',
    marginTop: -8,
    color: '#ffffff'
},
title2:{
    fontSize:25,
    textAlign:'right',
    marginTop: 12,
    color: '#ffffff'
}
});

export default Categorygrid;