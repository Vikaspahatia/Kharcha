import React from 'react';
import {Platform} from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Categoryscreen from '../screens/categoryscreen';
import HisabScreen from '../screens/HisabScreen';
import CategoryDetailScreen from '../screens/categoryScreenDetail';
import AddItem from '../screens/addItem';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import ToggleDrawer from '../components/toggleScreen';
import SplashScreen2 from '../screens/SplashScreen2';
import MonthlyRecordScreen from '../screens/monthlyRecord';
import AboutUsScreen from '../screens/AboutUsScreen';
const defaultstacknavoptions = {
    
    headerStyle:{
        backgroundColor: Platform.OS==='android'? 'red':''
    },
    headerTintColor:Platform.OS === 'android' ? 'white':'red'
};
    const AppNavigator = createStackNavigator({
        
    // Splash:SplashScreen,
    Categories: Categoryscreen,
    Hisab: HisabScreen, 
    CategoryDetail: CategoryDetailScreen, 
    AddItem:AddItem,
    Monthly: MonthlyRecordScreen,
    AboutUs: AboutUsScreen,
    },
    {
    defaultNavigationOptions: defaultstacknavoptions,
    headerShown: false,
    });
    
    const DrawerNavigator = createDrawerNavigator({
        Screen: AppNavigator
    },{
        contentComponent: props => <ToggleDrawer {...props} />
    });
    
    const authDefaultstacknavoptions = {
        headerShown: false,
        headerStyle:{
            backgroundColor: Platform.OS==='android'? '#368cb3':''
        },
        headerTintColor:Platform.OS === 'android' ? 'white':'#368cb3'
    };
        const LoginNavigator = createStackNavigator({
            
        Login:LoginScreen
    },
        {
            defaultNavigationOptions: authDefaultstacknavoptions
    });


    const SignUpNavigator = createStackNavigator({
        SignUp:SignUpScreen
        },
        {
            defaultNavigationOptions: authDefaultstacknavoptions
        });
const MainNavigator =  createSwitchNavigator({
    Splash:SplashScreen,
    Splash2: SplashScreen2,
    Login:LoginNavigator,
    SignUp:SignUpNavigator,
    App: DrawerNavigator
});
export default createAppContainer(MainNavigator);