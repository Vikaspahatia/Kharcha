import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationContainer from './Navigator/NavigationContainer';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import itemReducer from './store/reducer/item';
import categoryReducer from './store/reducer/category';
import authReducer from './store/reducer/auth';
import dateReducer from './store/reducer/changeDate';
import recordReducer from './store/reducer/record';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import amountReducer from './store/reducer/amount';
import InternetConnectionAlert from "react-native-internet-connection-alert";
const rootReducer = combineReducers({
  items: itemReducer,
  category: categoryReducer,
  auth: authReducer,
  amount: amountReducer,
  date:dateReducer,
  record: recordReducer
});


// const initiate =() => {
//   var firebaseConfig = {
//    apiKey: "AIzaSyDdMJ_zVq9aHxTzwZU-R22w-4ECB3t5-B8",
//    authDomain: "kharcha-52413.firebaseapp.com",
//    databaseURL: "https://kharcha-52413-default-rtdb.firebaseio.com",
//    projectId: "kharcha-52413",
//    storageBucket: "kharcha-52413.appspot.com",
//    messagingSenderId: "215698451390",
//    appId: "1:215698451390:web:8e70ad5288d24f53f3e7ef",
//    measurementId: "G-6SNFCFZ9KD"
//  };
//  if (!firebase.apps.length) {
//    firebase.default.initializeApp(firebaseConfig);
//  }else {
//    firebase.default.app() // if already initialized, use that one
//  }
// }


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  
  // useEffect(() => {
  //   initiate();
  // }, [])
  return (
    <View style={{flex:1}}>
      <InternetConnectionAlert title="Facing issues with connection!" message="Please check your internet"
      onChange={(connectionState) => {
    // console.log("Connection State: ", connectionState);
     }}
    >    
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
    </InternetConnectionAlert> 
    </View>
  );
} 

