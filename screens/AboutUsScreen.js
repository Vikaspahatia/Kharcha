import React from 'react';
import {View, Text, StyleSheet , TouchableOpacity,FlatList, TouchableNativeFeedback, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient, colors } from 'expo-linear-gradient';
import {useSelector} from 'react-redux';
const AboutUsScreen = props =>{
    return(
        <View style={{flex:1}}>
            <LinearGradient style={{flex:1}} colors={["#202427", "#202427"]} start={[1, 1]} end={[0,0]}>
            <Text style={{color: 'white', fontSize: 21, alignSelf: 'center', marginBottom: 35, marginTop: 45}}>About Us</Text>
            <View>
                
            </View>
            </LinearGradient>
        </View>
    );
};

AboutUsScreen.navigationOptions = navdata =>{
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS ==='android' &&Platform.Version >=21 ){
        TouchableCmp = TouchableNativeFeedback;
    }
    return{
        headerShown: false,
    };
};

export default AboutUsScreen;