import React,{useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as monthlyRecordAction from '../store/action/record';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient, colors } from 'expo-linear-gradient';
import * as authAction from '../store/action/auth';

import firebase from 'firebase';
const ToggleDrawer = (props,{navigation}) => {
   const userId = useSelector(state => state.auth.userId);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const dispatch = useDispatch();
   const monthlyRecord = async()=>{
      try {
         // await firebase.auth()
         // .deleteUser(userId)
         // .then(() => {
         //   console.log('Successfully deleted user');
         // })
         // .catch((error) => {
         //   console.log('Error deleting user:', error);
         // });
         // await dispatch(authAction.deleteAccount());
         await dispatch(monthlyRecordAction.fetchRecord());
         props.navigation.navigate('Monthly');
       } catch (err) {
         setError(err.message);
         setIsLoading(false);
       }
   }
   
  useEffect(()=>{
     if(error === 'Please Login Again!!'){
         props.navigation.navigate('Login');
     }
   else if(error){
     Alert.alert('An error occurred!', error,[{text:'Okay!'}]);
   }
 },[error]);
   return(
    <View style={styles.container}>
       {isLoading ? (
                <ActivityIndicator size="small" color='red' />
              ) : (
      <View style={{flex:1, flexDirection:'column', justifyContent:'flex-start'}}>
        <View style={styles.upper}>
         <View style={{flexDirection: 'row'}}>
           
            <View>
               <Text style={{marginTop: 45, paddingLeft: 15, fontSize: 17, fontStyle: 'italic'}}>Hey there,</Text>
               <Text style={{paddingLeft: 15, fontSize: 30, fontWeight: 'bold'}}>username</Text>
            </View>
         </View>
        </View>

        <View style={styles.lower}>
        <LinearGradient style={{flex:1}} colors={["#292e33", "#292e33"]} start={[0, 0]} end={[1,1]}>
           
             
            <TouchableOpacity onPress={()=>{monthlyRecord()}}>
               <Text style={{color: '#ffffff', fontSize: 17, paddingLeft: 30, marginTop: 15}}>Monthly Record</Text>
            </TouchableOpacity>
            <View style={{borderBottomWidth: 0.3, borderBottomColor: 'white', margin: 15}}></View>
            <Text style={{color: '#ffffff', fontSize: 17, paddingLeft: 30, marginTop: 3}}
            onPress={() => Linking.openURL('mailto:vikaspahatia@gmail.com') } >Report Issues</Text>
            <View style={{borderBottomWidth: 0.3, borderBottomColor: 'white', margin: 15}}></View>
            <TouchableOpacity onPress = {()=> props.navigation.navigate('AboutUs')}>
            <Text style={{color: '#ffffff', fontSize: 17, paddingLeft: 30, marginTop: 3}}>About Us</Text>
            </TouchableOpacity>
            <View style={{borderBottomWidth: 0.3, borderBottomColor: 'white', margin: 15}}></View>
            <TouchableOpacity onPress={()=>{
              Alert.alert('Are you sure?', 'Do you really want to Logout?', [
               { text: 'No', style: 'default' },
               {
                 text: 'Yes',
                 style: 'destructive',
                 onPress:() => {
                   
                  dispatch(authAction.logout());
                  props.navigation.navigate('Login');
                 }
               }
             ]);
           }}>
               <Text style={{color: '#ffffff', fontSize: 17, paddingLeft: 30, marginTop: 3}}>Log out</Text>
            </TouchableOpacity>
            <View style={{borderBottomWidth: 0.3, borderBottomColor: 'white', margin: 15}}></View>



            {/* <Image style={{height: 100, width: 80, alignSelf: 'center', bottom: 40, position: 'absolute',}} source={require('../assets/RS_logo.png')} /> */}
            <Text style={{
               color: '#fda507', fontSize: 27,
               alignSelf: 'center', bottom: 30, 
               position: 'absolute', fontStyle: 'italic'}}>KHARCHA</Text>
            <Text style={{
               color: '#fda507', fontSize: 13,
               alignSelf: 'center', bottom: 14, 
               position: 'absolute', fontStyle: 'italic'}}>version 1.0.0</Text>
         </LinearGradient>
        </View>    
    </View>
              )}
    </View>
)
            };

export default ToggleDrawer;


const styles = StyleSheet.create({
 container: {
    flex:1,
 },
 upper: {
    flex: 1,
    backgroundColor: '#294992',
 },
 lower: {
    flex: 4.5,
 },
 text1: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 65,
 },
 text2: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
 },
 text3: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 15,
 },
 text: {
    fontSize: 15,
    color: 'black',
    // alignSelf: 'center',
    // position: 'absolute',
    // bottom: 15,
 }
});