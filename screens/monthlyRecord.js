import React from 'react';
import {View, Text, StyleSheet , TouchableOpacity,FlatList, TouchableNativeFeedback, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient, colors } from 'expo-linear-gradient';
import {useSelector} from 'react-redux';
const MonthlyRecordScreen = props =>{
    const record = useSelector( state => state.record.availableRecord);
    const renderRecords = itemData =>{
        return <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{color: 'white', fontSize: 19}}>{itemData.item.date }      </Text>
            <Text style={{color: 'white', fontSize: 19}}>     {itemData.item.total} </Text>
        </View>
    };
    return(
        <View style={{flex:1}}>
            <LinearGradient style={{flex:1}} colors={["#202427", "#202427"]} start={[1, 1]} end={[0,0]}>
            <Text style={{color: 'white', fontSize: 21, alignSelf: 'center', marginBottom: 35, marginTop: 45}}>Monthly Record</Text>
            <View>
                <FlatList  
                    data={record} 
                    keyExtractor={(item, index) => index.toString()}
                    renderItem ={renderRecords}
                />
            </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({

});

MonthlyRecordScreen.navigationOptions = navdata =>{
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS ==='android' &&Platform.Version >=21 ){
        TouchableCmp = TouchableNativeFeedback;
    }
    return{
        headerShown: false,
        headerTitle:'Monthly Record Screen',
        headerLeft:() =>
        <TouchableCmp onPress={()=>
            {
            navdata.navigation.goBack();
         }
         }>
                <Ionicons 
                    style={{paddingLeft:6}}
                    name="arrow-back" 
                    size={30} 
                    color={Platform.OS === 'android' ? 'white':'red'} 
                />
                </TouchableCmp>
    };
};


export default MonthlyRecordScreen;