import React,{useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import * as authActions from '../store/action/auth';
import * as changeDateAction from '../store/action/changeDate';
import {useDispatch, useSelector} from 'react-redux';
import Category from '../models/category';
import { useState } from 'react/cjs/react.development';
import Moment from 'moment';

const SplashScreen = props =>{
    const dispatch = useDispatch();
    
    let dateMoment = Moment().format('MM-YYYY');
    useEffect(()=>{
        const tryLogin = async ()=>{
            const userData =await AsyncStorage.getItem('userData');
            // const monthDate = await AsyncStorage.getItem('month');
            // const transformedMonth = JSON.parse(monthDate);
            // console.log(transformedMonth, 'transformedMonth');
            // const date = transformedMonth.data;
            const transformedData =await JSON.parse(userData);
            if(!userData){
                
                props.navigation.navigate('Login');
                return;
            }
            
            const token = transformedData.resData.idToken;
            const userId = transformedData.resData.localId;
            const expiryDate = transformedData.resData.expiresIn;
            const expirationDate = new Date(expiryDate);
            if(!userId){
                props.navigation.navigate('Login');
                return;
            }
            try{
                await dispatch(authActions.authentication(userId, token));
                await dispatch(changeDateAction.fetchMonthly());
                // console.log(date, 'useSelector');
                
                
                props.navigation.navigate('Splash2');
            } catch(err){
                Alert.alert(err.message)
            }
            // const expirationTime = expirationDate.getTime() - new Date().getTime();
            // dispatch(authActions.authentication(userId, token, expirationTime));
        }
        tryLogin();
    },[dispatch])
    useEffect(()=>{

    },[])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color='red' />
        </View>
    )
};
const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default SplashScreen;