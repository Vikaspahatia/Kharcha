import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions, TextInput,TouchableHighlight, ActivityIndicator,Modal,AsyncStorage, Alert} from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient, colors } from 'expo-linear-gradient';
import {  Provider } from 'react-native-paper';
import * as authAction from '../store/action/auth';
import * as categoryAction from '../store/action/category';
import * as amountAction from '../store/action/amount';
import * as changeDateAction from '../store/action/changeDate';
import {CATEGORIES} from '../data/dummy_data';
import Moment from 'moment';
const SignUpScreen = props => {
  const [email,setEmail] =useState();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [internalEmail, setInternalEmail] = useState();
  const [sendEmail, setSendEmail] = useState();
  const [emailCheck, setEmailCheck] = useState();
  const [passCheck, setPassCheck] = useState(false);
  const [isSetModal, setIsSetModal] = useState(false);
  const dispatch = useDispatch();
  let date = Moment().format('MM-YYYY');


  
  const signUpHandler = async()=>{
    setError(null);
    // setIsLoading(true);
    try {
      await dispatch(authAction.signup(
        email,
        password
      ));
        var i;
      for(i=0;i<CATEGORIES.length;i++){
        await dispatch(categoryAction.createCategory(
          date,
          CATEGORIES[i].title,
          CATEGORIES[i].color,
          CATEGORIES[i].price
        ))
      };
      await dispatch(amountAction.createAmount(date,0));
      
      await dispatch(changeDateAction.fetchMonthly());
    } catch (err) {
      setError(err.message);
    }
    props.navigation.navigate('App');
    setIsLoading(false);
    } 
  const dismissSubCatModal = ()=>{
    setIsSetModal(false);
  }
  useEffect(()=>{
    
    // const internalData = async()=>{
    //   const userData =await AsyncStorage.getItem('userData');
    //             const transformedData = JSON.parse(userData);
    //             setInternalEmail(transformedData.resData.email);
    //             setLogin(true);
    //   }
    //   internalData();
    if(error){
      setIsSetModal(true);
    }
  },[error]);
  useEffect(()=>{

  },[]);

        return (
          <LinearGradient style={styles.container} colors={["#202427", "#202427"]} start={[1, 1]} end={[0,0]}>
            
          <StatusBar style="auto" backgroundColor= "#202427"  />
              
                
        <Text style={{fontSize: 20, color: '#427f95', marginTop: 105, marginBottom: 50  }}>APP LOGO</Text>
       
        <TextInput  
        style={{height: 45,
        backgroundColor: '#424547', 
        fontSize: 20, width: '75%',
        borderRadius: 23,
        borderColor:'#303437',
        borderWidth: 2,
        paddingLeft: 10,
        }} 
        placeholder="  email id"
        keyboardType='email-address'
        placeholderTextColor="#77797a"
        onChangeText={inputText => setEmail(inputText)}
        value={email}
        />
        <TextInput  
        style={{height: 45,
        backgroundColor: '#424547', 
        fontSize: 20, width: '75%',
        borderRadius: 23,
        borderColor:'#303437',
        borderWidth: 2,
        paddingLeft: 10,
        margin: 20}} 
        placeholder="  password"
        placeholderTextColor="#77797a"
        keyboardType='default'
        secureTextEntry
        onChangeText={inputText => setPassword(inputText)}
        value={password}
        />
  
        <View style={{marginTop: '67%', width: '100%'}}>
        <LinearGradient style={styles.appButtonContainer} colors={["#3f66b1", "#294992"]} start={[0, 0]} end={[0.4,2]}>
        <TouchableOpacity   onPress={signUpHandler}>
        <Text style={styles.appButtonText}>Sign Up</Text>
        </TouchableOpacity>
        </LinearGradient>
              
        <LinearGradient style={styles.appButtonContainer1} colors={["#3f66b1", "#294992"]} start={[0, 0]} end={[0.4,2]}>
        <TouchableOpacity   onPress = {() => {props.navigation.navigate('Login')}}>
        <Text style={styles.appButtonText}>Back to Login</Text>
        </TouchableOpacity>
        </LinearGradient>
        </View>


        <Modal
        animationType="slide"
        transparent={true}
        visible={isSetModal}
        onDismiss={() => dismissSubCatModal()}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModal(!modalVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{error}</Text>
            <TouchableHighlight
              style={{ ...styles.appButtonContainer, marginTop:50 }}
              onPress={() => {
                setIsSetModal(!isSetModal);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
            </View>
            </View>
            </Modal>
      </LinearGradient>
          )
      }
  
  export default SignUpScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#eef2f7',
      alignItems: 'center',
    },
    appButtonContainer: {
      borderRadius: 23,
      width: '75%',
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignSelf: 'center',
      height: 45,
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      zIndex: 1,
    },
    appButtonContainer1: {
      borderRadius: 23,
      width: '75%',
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignSelf: 'center',
      height: 45,
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      zIndex: 1,
      marginTop: 18,
    },
    appButtonText: {
      marginTop: 2,
      fontSize: 16,
      color: "#c2d9eb",
      //fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    centeredView:{
      flex:1, 
      justifyContent:'center', 
      alignItems:'center'
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    modalView: {
      margin: 17,
      marginTop:67 ,
      backgroundColor: "white",
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },  
  });



// import React, { useState,useReducer, useCallback , useRef} from 'react';

// import { StatusBar } from 'expo-status-bar';
// import {
//   ScrollView,
//   View,
//   KeyboardAvoidingView,
//   StyleSheet,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   Text,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useDispatch } from 'react-redux';
// import firebase from 'firebase';
// import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
// import {CATEGORIES} from '../data/dummy_data';

// const SignUpScreen = props => {
//   const recaptchaVerifier = useRef(null);
//       const [phone, setPhone] = useState('');
//       const [verificationId, setVerificationId] = useState();
//       const [verificationCode, setVerificationCode] = useState();
//       const [isLoading, setIsLoading] = useState(false);
//       const attemptInvisibleVerification = false;
//       const phoneHandler = text =>{
//         setPhone(text);
//       }
//       const otpHandler = text =>{
//         setVerificationCode(text);
//       }
//       const beginSignIn = async () => {
//         try {
//           const phoneProvider = new firebase.auth.PhoneAuthProvider();
//           const verificationId = await phoneProvider.verifyPhoneNumber(
//             '+91'+phone,
//             recaptchaVerifier.current
//           );
//           setVerificationId(verificationId);
//           Alert('Verification code has been sent to your phone.');
//         } catch (err) {
//           console.log(err.message);
//           Alert.alert(`Error: ${err.message}`);
//         }

//     }

//     const confirmOTP = async () => {
//       try {
//         const credential = firebase.auth.PhoneAuthProvider.credential(
//           verificationId,
//           verificationCode
//         );
//         await firebase.auth().signInWithCredential(credential);
//         await firebase.database().ref('/registeredNumber/'+'+91'+phone).set({
//           UserSet: true
//         })
//         Alert.alert( 'Phone authentication successful 👍' );
//         props.navigation.navigate('App');
        
//       } catch (err) {
//         Alert.alert(  `Error: ${err.message}`);
//       }
//   }

//     if(!verificationId){
//       return (
//         <View style={styles.container}>
          
//         <StatusBar style="auto" backgroundColor= "#368cb3"  />
//         <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={firebase.app().options}
//         attemptInvisibleVerification={attemptInvisibleVerification}
//       />
//       <Text style={{fontSize: 20, color: '#427f95', marginTop: 180, marginBottom: 100  }}>KHARCHA</Text>
    
//       <TextInput  
//       style={{height: 40,
//       backgroundColor: 'white', 
//       fontSize: 20, width: 260, 
//       borderRadius: 10,
//       borderColor:'#368cb3',
//       paddingLeft: 10,
//       borderWidth: 2,}} 
//       placeholder="Phone Number"
//       keyboardType='phone-pad'
//       onChangeText={phoneHandler}
//       value={phone}
//       />
    
    
//       <TouchableOpacity style={styles.appButtonContainer}
//       onPress = {beginSignIn}
//       >
//         <Text style={styles.appButtonText}>Send OTP</Text>
//         </TouchableOpacity>
      
//         <TouchableOpacity style={styles.appButtonContainer}
//       onPress = {()=>{props.navigation.navigate('Login')}}
//       >
//         <Text style={styles.appButtonText}>Login </Text>
//         </TouchableOpacity>
//     </View>
//       );
//     } else {
//       return (
//         <View style={styles.container}>
//         <StatusBar style="auto" backgroundColor= "#368cb3"  />
//       <Text style={{fontSize: 20, color: '#427f95', marginTop: 180, marginBottom: 100  }}>KHARCHA</Text>
    
//       <TextInput  
//       style={{height: 40,
//       backgroundColor: 'white', 
//       fontSize: 20, width: 260, 
//       borderRadius: 10,
//       borderColor:'#368cb3',
//       paddingLeft: 10,
//       borderWidth: 2,}} 
//       placeholder="OTP"
//       keyboardType='phone-pad'
//       onChangeText={otpHandler}
//       value={verificationCode}
//       />
    
    
//       <TouchableOpacity style={styles.appButtonContainer}
//       onPress = {confirmOTP}
//       >
//         <Text style={styles.appButtonText}>Confirm OTP</Text>
//         </TouchableOpacity>
      
        
//     </View>
//       );
//     }
  
// //   return (
// //     <View style={styles.container}>
// //     <StatusBar style="auto" backgroundColor= "#368cb3"  />
// //   <Text style={{fontSize: 20, color: '#427f95', marginTop: 180, marginBottom: 100  }}>KHARCHA</Text>

// //   <TextInput  
// //   style={{height: 40,
// //   backgroundColor: 'white', 
// //   fontSize: 20, width: 260, 
// //   borderRadius: 10,
// //   borderColor:'#368cb3',
// //   paddingLeft: 10,
// //   borderWidth: 2,}} 
// //   placeholder="Phone Number"
// //   onChangeText={phoneHandler}
// //   value={phone}
// //   />


// //   <TouchableOpacity style={styles.appButtonContainer}
// //   onPress = {()=>{
// //     props.navigation.navigate({
// //     routeName:'Login'})
// //   }}
// //   >
// //     <Text style={styles.appButtonText}>Log In</Text>
// //     </TouchableOpacity>
  
// //     <TouchableOpacity style={styles.appButtonContainer}
// //   onPress = {()=>signUpHandler}
// //   >
// //     <Text style={styles.appButtonText}>SignUp</Text>
// //     </TouchableOpacity>
// // </View>
// //   );
// };

// SignUpScreen.navigationOptions = {
//   headerTitle: 'SignUpScreen'
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: '#eef2f7',
//     alignItems: 'center',
//   },
//   appButtonContainer: {
//     marginTop: 15,
//     backgroundColor: "#368cb3",
//     borderRadius: 25,
//     width: 140,
//     paddingVertical: 10,
//     paddingHorizontal: 12
//   },
//   appButtonText: {
//     fontSize: 15,
//     color: "#fff",
//     fontWeight: "bold",
//     alignSelf: "center",
//     textTransform:"uppercase"
//   }
// });

// export default SignUpScreen;
