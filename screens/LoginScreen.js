import { StatusBar } from 'expo-status-bar'; 
import React,{useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions, TextInput,TouchableHighlight, ActivityIndicator,Modal,AsyncStorage, Alert} from 'react-native';
import { LinearGradient, colors } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import {  Provider } from 'react-native-paper';
import * as authAction from '../store/action/auth';
import * as categoryAction from '../store/action/category';
import * as amountAction from '../store/action/amount';
import * as changeDateAction from '../store/action/changeDate';
import {CATEGORIES} from '../data/dummy_data';
import Moment from 'moment';
const LoginScreen = props => {
  const [email,setEmail] =useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [internalEmail, setInternalEmail] = useState();
  const [sendEmail, setSendEmail] = useState();
  const [emailCheck, setEmailCheck] = useState();
  const [passCheck, setPassCheck] = useState(false);
  const [isSetModal, setIsSetModal] = useState(false);
  const dispatch = useDispatch();
  // let date = Moment().format('MMMM-YYYY');
  let date = "02-2021";
  let check;
  const passwordHandler = text =>{
    setPassword(text);
  }

  const forgotPassword = async() =>{
      var emailToBeSend = internalEmail?internalEmail:email;
      await dispatch(authAction.forgotPassword(emailToBeSend));
  }

  const checkTextInput = async() => {
    if (!email.trim()) {
      alert('Please enter email-id');
      return;
    }
    if (!password.trim()) {
      alert('Please enter password');
      return;
    }
    else{
    loginHandler();
    }
  };

  
  const loginHandler = async()=>{
      if(internalEmail){
        setSendEmail(internalEmail)
      } else {
        setSendEmail(email);
      }
      setError(null);
    setIsLoading(true);
    try {
      await dispatch(authAction.login(
        internalEmail?internalEmail:email,
        password
      ));
      await dispatch(changeDateAction.fetchMonthly());
      props.navigation.navigate('App');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    
}
  const dismissSubCatModal = ()=>{
    setIsSetModal(false);
  }
  useEffect(()=>{
    
    const internalData = async()=>{
      const userData =await AsyncStorage.getItem('userData');
                const transformedData = JSON.parse(userData);
                setInternalEmail(transformedData.resData.email);
                setLogin(true);
      }
      internalData();
    if(error){
      setIsSetModal(true);
    }
  },[error, setInternalEmail]);


  return (
      <LinearGradient style={styles.container} colors={["#202427", "#202427"]} start={[1, 1]} end={[0,0]}>

      <StatusBar style="auto" backgroundColor= "#202427"  />
    <Text style={{fontSize: 20, color: '#427f95', marginTop: 80, marginBottom: 50  }}>APP LOGO</Text>
    
    
    <TextInput  
    style={{height: 45,
    backgroundColor: '#424547', 
    fontSize: 20, width: '75%',
    borderRadius: 23,
    borderColor:'#303437',
    paddingLeft: 10,
    borderWidth: 2,}} 
    placeholder="  email id"
    placeholderTextColor="#77797a"
    keyboardType='email-address'
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

    

          
      
      <TouchableOpacity  onPress={forgotPassword}>
      <Text style={{fontSize: 15, color: '#c2d9eb', alignSelf: 'center', marginBottom: 20}}>Forgot Password?</Text>
      </TouchableOpacity>



      <View style={{marginTop: '50%', width: '100%'}}>    
      <LinearGradient style={styles.appButtonContainer} colors={["#3f66b1", "#294992"]} start={[0, 0]} end={[0.4,2]}>
      <TouchableOpacity   onPress={loginHandler}>
      <Text style={styles.appButtonText}>LogIn</Text>
      </TouchableOpacity>
      </LinearGradient>
    

  

    <LinearGradient style={styles.appButtonContainer1} colors={["#3f66b1", "#294992"]} start={[0, 0]} end={[0.4,2]}>
    <TouchableOpacity   onPress = {() => {props.navigation.navigate('SignUp')}}>
    <Text style={styles.appButtonText}>Sign Up</Text>
    </TouchableOpacity>
    </LinearGradient>
      </View>
    <Modal
    animationType="fade"
    transparent={true}
    visible={isSetModal}
    onDismiss={() => dismissSubCatModal()} >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={{fontSize: 20, marginBottom: 15, color: '#c2d9eb'}}>Uh-oh,</Text>
        <Text style={{fontSize: 16, marginBottom: 30, color: '#c2d9eb'}}>{error}</Text>
        <TouchableHighlight  onPress={() => {  setIsSetModal(!isSetModal);  }}>
          <LinearGradient 
            style={styles.appButtonContainerX} 
            colors={["#3f66b1", "#294992"]} 
            start={[1, 0]} end={[0,1.2]}>
            <Text style={{fontSize: 14, color: '#c2d9eb', fontWeight: 'bold'}}>Check Again</Text>
          </LinearGradient>
          </TouchableHighlight>
      </View>
    </View>
  </Modal>
</LinearGradient>

      )
  }

  export default LoginScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#e9ecf2',
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
    appButtonContainerX: {
      borderRadius: 20,
      width: '75%',
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignSelf: 'center',
      height: 40,
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      zIndex: 1,
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
      alignItems:'center',
      //width: '90%'
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    modalView: {
      //margin: 17,
      //marginTop:50 ,
      backgroundColor: "#424547",
      borderRadius: 35,
      borderWidth: 3,
      borderColor: '#303437',
      // borderTopRightRadius: 30,
      // borderBottomLeftRadius: 30,
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
      textAlign: "center"
    },  
  });