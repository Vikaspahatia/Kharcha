import React,{useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, AsyncStorage} from 'react-native';
import * as authActions from '../store/action/auth';
import * as changeDateAction from '../store/action/changeDate';
import * as categoryAction from '../store/action/category';
import * as amountAction from '../store/action/amount';
import {useDispatch, useSelector} from 'react-redux';
import {CATEGORIES} from '../data/dummy_data';
import Category from '../models/category';
import { useState } from 'react/cjs/react.development';
import Moment from 'moment';

const SplashScreen2 = props =>{
    const dispatch = useDispatch();
    let date = useSelector(state =>state.date.date);
    let dateMoment = Moment().format('MM-YYYY');
    useEffect(()=>{
        const newEntry = async ()=>{
            if(date != dateMoment){
            try{
                
                var i;
            for(i=0;i<CATEGORIES.length;i++){
                 await dispatch(categoryAction.createCategory(
                dateMoment,
                CATEGORIES[i].title,
                CATEGORIES[i].color,
                CATEGORIES[i].price
                ))
            };
            await dispatch(amountAction.createAmount(dateMoment,0));
            await dispatch(changeDateAction.fetchMonthly());
            
            } catch(err){
            }
        }
        props.navigation.navigate('App');
    }
        newEntry();
        
    },[dispatch]);
    useEffect(()=>{

    },[]);
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

export default SplashScreen2;