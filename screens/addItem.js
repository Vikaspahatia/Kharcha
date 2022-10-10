import React,{useState, useReducer, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator,Alert} from 'react-native';
import * as itemsActions from '../store/action/item';
import * as categoryActions from '../store/action/category';
import {useDispatch, useSelector } from 'react-redux';
import { LinearGradient, colors } from 'expo-linear-gradient';
import Moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as amountAction from '../store/action/amount';
const AddItem  = (props) =>{
  let date = Moment().format('DD-MM-YYYY');
  let dateFire = useSelector(state => state.date.date);
  const catId = props.navigation.getParam('categoryId');
  const total = useSelector(state =>state.amount.availableItems);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const category  = useSelector(state => state.category.availableItems);
  const index = category.findIndex(({ id }) => id === catId);

  const checkTextInput = async() => {
    if (!title.trim()) {
      alert('Please Enter Ttile');
      return;
    }
    if (!description.trim()) {
      alert('Please Enter Description');
      return;
    }
    if (!price.trim()) {
      alert('Please Enter Amount');
      return;
    }
    // setError(null);
    //     setIsLoading(true);
    // try{
    //   await dispatch(
    //       itemsActions.createItem(
    //         dateFire,
    //         catId,
    //         title,
    //         description,
    //         +price,
    //         date
    //       )
    //     );
    //     await dispatch(
    //       categoryActions.updateAmount(
    //         dateFire,
    //         catId,
    //         parseInt(category[index].price) + parseInt(price))
    //     )
    //     await dispatch(amountAction.updateTotalAmount(dateFire,total[0].id, parseInt(total[0].amount)+ parseInt(price)));
    //     props.navigation.goBack();
    //       } catch(err){
    //         setError(err.message);
    //       }
    //   setIsLoading(false); 
  submitHandler();
  };


  const submitHandler = async() =>{
    setError(null);
        setIsLoading(true);
    try{
      await dispatch(
          itemsActions.createItem(
            dateFire,
            catId,
            title,
            description,
            +price,
            date
          )
        );
        await dispatch(
          categoryActions.updateAmount(
            dateFire,
            catId,
            parseInt(category[index].price) + parseInt(price))
        )
        await dispatch(amountAction.updateTotalAmount(dateFire,total[0].id, parseInt(total[0].amount)+ parseInt(price)));
        props.navigation.goBack();
          } catch(err){
            setError(err.message);
          }
      setIsLoading(false); 
  }


  if(isLoading){
    return <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#202427'}}>
    <ActivityIndicator size='large' color='#d1d4c9'/>
</View>
} 
return (    
  <View style={{flex: 1, backgroundColor: '#292e33'}}>
    <View style={{flex: 1, marginTop: 50}}>
    <Text style={styles.title}>Title</Text>
    <TextInput 
      keyboardType='default'    autoCapitalize = 'sentences'    
      returnKeyType = 'next'    onChangeText = {inputText => setTitle(inputText)}   value={title}
      style={{
        borderRadius: 7,
        //backgroundColor: 'white',
        height: 40,
        width: '90%',
        alignSelf: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        backgroundColor: '#6e6e6e', 
      }} />

    <Text style={styles.title}>Description</Text>
    <TextInput 
      keyboardType='default'    autoCapitalize = 'sentences'    
      returnKeyType = 'next'    onChangeText = {inputText => setDescription(inputText)}   value={description}
      style={{
        borderRadius: 7,
        //backgroundColor: 'white',
        height: 75,
        width: '90%',
        alignSelf: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        backgroundColor: '#6e6e6e', 
      }} />

    <Text style={styles.title}>Amount</Text>
    <TextInput 
      keyboardType='numeric'    autoCapitalize = 'sentences'    
      returnKeyType = 'next'    onChangeText = {inputText => setPrice(inputText)}   value={price}
      style={{
        borderRadius: 7,
        //backgroundColor: 'white',
        height: 40,
        width: '90%',
        alignSelf: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        backgroundColor: '#6e6e6e', 
      }} />
    
      <LinearGradient 
      style={{
        width: '70%', 
        //backgroundColor: '#1b9e58',
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 30
        }} colors={["#40cf82", "#1b9e58"]} start={[0, 0]} end={[0.4,2]}>
        <TouchableOpacity style={{
          width: '70%', 
          //backgroundColor: '#1b9e58',
          height: 40,
          borderRadius: 20,
          alignSelf: 'center',
          // marginTop: 30
          }}
          onPress = {checkTextInput}
          >
        <Text style={{alignSelf: 'center', marginTop: 9, color: 'white', 
          fontSize: 15,}}>ADD DETAILS</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>
  </View>
  
)
}

AddItem.navigationOptions =navData => {
  return{
    headerShown: false,
    headerStyle: {
      backgroundColor: '#7404c9',
    }
  }
}

const styles= StyleSheet.create({
input:{
  // width:220,
  // borderRadius:10, 
  // borderBottomColor:'black', 
  // borderWidth:1.5,
  // padding:10,
  // marginBottom:10

  paddingHorizontal:10,
  margin:15,
  paddingVertical:5,
  borderBottomColor: '#ccc',
  borderBottomWidth: 1,
  borderWidth:1,
  borderColor:'#ccc',
  borderRadius:10,

},
title: {
  fontSize: 18,
  marginLeft: 20,
  marginTop: 20,
  marginBottom: 6,
  color: '#c2d9eb'
},
centered:{
  flex:1, 
  justifyContent:'center', 
  alignItems:'center'
},
});

export default AddItem;