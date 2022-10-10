import React, { useEffect, useState, useCallback }  from 'react';
import {View,Button, Text, StyleSheet, FlatList, 
    TouchableOpacity,Platform, TouchableNativeFeedback, ActivityIndicator, Modal,Alert, Pressable, TextInput} 
    from 'react-native';
import { CATEGORIES } from '../data/dummy_data';
import CategoryItem from '../components/categoryItem';
import { LinearGradient, colors } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import  * as itemActions from '../store/action/item';
import * as categoryActions from '../store/action/category';
import * as amountAction from '../store/action/amount';
import Moment from 'moment';


const HisabScreen = (props,{navigation}) =>{
  
    let date = Moment().format('DD-MM-YYYY');
    let dateFire = useSelector(state => state.date.date);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [modal, setModal ] = useState(false);
    const [price, setPrice] =useState();
    const [description, setDescription] = useState();
    const [prevPrice, setPrevPrice] = useState();
    const [title, setTitle] = useState();
    const [itemId, setItemId] = useState();
    const items = useSelector(state => state.items.availableItems);
    const total = useSelector(state =>state.amount.availableItems);
    const catId = props.navigation.getParam('categoryId');
    var displayedCat = items.filter(meal => meal.categoryIds.indexOf(catId) >= 0);
    const category  = useSelector(state => state.category.availableItems);
  const index = category.findIndex(({ id }) => id === catId);
    const dispatch = useDispatch();
    
    const loadItems = useCallback( async() =>{
        setError(null);
        setIsLoading(true);
        try {
        await dispatch(itemActions.fetchItems(dateFire));
        await dispatch(amountAction.fetchTotal(dateFire));
        setModal(false);
        } catch(err){
            setError(err.message)
        }
        setIsLoading(false);
    },[dispatch, setIsLoading, setError]);

    useEffect(()=>{
        
        loadItems();
    },[dispatch, loadItems]);
    useEffect(()=>{
      
    },[]);
    const finalPrice = parseInt(category[index].price)+parseInt(price) - parseInt(prevPrice);
    const editModalHandler = async() =>{
      setError(null);
        setIsLoading(true);
      try{
        await dispatch(
          itemActions.updateItem(
            dateFire,
            itemId,
            title,
            description,
            price,
            date
          )
        );
          await dispatch(
            categoryActions.updateAmount(
              dateFire,
              catId,
              finalPrice
            )
          );
          await dispatch(amountAction.updateTotalAmount(dateFire,total[0].id, parseInt(total[0].amount)+ parseInt(price) - parseInt(prevPrice)));
        setModal(false);  
      }  catch(err){
        setError(err.message);
      }
      setIsLoading(false);                                                                           
    }
    const deleteHandler = () => {
      Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async() => {
            try{
            dispatch(itemActions.deleteItem(dateFire,itemId));
            dispatch(categoryActions.updateEditAmount(
              dateFire,
              catId,
              0,
              price
            ));
            dispatch(amountAction.updateTotalAmount(dateFire,total[0].id, parseInt(total[0].amount) - parseInt(price)));
            loadItems();
            } catch(err){
              setError(err.message);
            }
          }
        }
      ]);
      setModal(false);
    };
    if(isLoading){
        return <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#202427'}}>
            <ActivityIndicator size='large' color='#d1d4c9'/>
        </View>
    }

    if(!isLoading && displayedCat.length ===0){
        return <LinearGradient style={{flex: 1}} colors={["#202427", "#202427"]} start={[1, 1]} end={[0,0]}>
          <View style={styles.centered}>
              <Entypo style={{marginTop: -100}} name="emoji-sad" size={80} color="#d1d4c9" />
              <Text style={{fontSize: 20, color: '#d1d4c9'}}>No Items found</Text>        
              <Text style={{fontSize: 25, color: '#d1d4c9', marginTop: 50, fontWeight: 'bold'}}
              onPress = {()=> props.navigation.navigate('AddItem',{  categoryId: catId })} >ADD SOME</Text>
          </View>
        </LinearGradient>
    }
    if(error){
        return <View style={styles.centered}>
            <Text>An error Occurred!</Text>
            <Button title='Refresh' onPress={loadItems} color='red' />
        </View>
    }
    
    const renderCatItems = itemData =>{
        return <CategoryItem 
            title={itemData.item.title}
            amount={itemData.item.price}
            description={itemData.item.description}
            onSelectCat={()=> {
            setModal(true)
            setPrice(itemData.item.price.toString())
            setDescription(itemData.item.description)
            setTitle(itemData.item.title)
            setItemId(itemData.item.id)
            setPrevPrice(itemData.item.price.toString())
            }
        }
        />
    };
  return(
    <View style={{flex: 1, backgroundColor: '#202427'}}>

    {/* <Text></Text> */}
      <Feather style={{alignSelf: 'flex-end', marginRight: 16, marginTop: 35}} name="plus" size={35} color="white"
        onPress = {()=> props.navigation.navigate('AddItem',{  categoryId: catId })} />
        <FlatList 
            data={displayedCat} 
            keyExtractor={(item, index) => item.id}
            renderItem ={renderCatItems}
        />
            <Modal
        animationType="slide"
        transparent={true}
        visible={modal}>

        <View>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            <View style={styles.formContainer}>
            <Text style={styles.textStyle1}>Title</Text>
            <TextInput placeholder="Title" 
                    style={styles.input}
                    onChangeText={text =>setTitle(text)}
                    value={title}
                    keyboardType='default'
                    returnKeyType='next'
                />
                </View>
            <View style={styles.formContainer}>
            <Text style={styles.textStyle1}>Description</Text>
            <TextInput placeholder="Description" 
                    style={styles.input}
                    onChangeText={text =>setDescription(text)}
                    value={description}
                    keyboardType='default'
                    returnKeyType='next'
                />
                </View>
                <View style={styles.formContainer}>
                <Text style={styles.textStyle1}>Amount</Text>
                <TextInput placeholder="Price" 
                    style={styles.input}
                    onChangeText={text =>setPrice(text)}
                    value={String(price)}
                    keyboardType='numeric'  />
                </View>

              <View style={{alignItems: 'center' ,width: '100%',}}>
                <Pressable
                style={{backgroundColor: "#26b569",
                width: '85%',
                height: 35,
                borderRadius: 20,
                padding: 9,
                marginBottom: 16}}
                onPress={() => editModalHandler()}>
                <Text style={styles.textStyle}>Save Changes</Text>
                </Pressable>
                <Pressable
                style={{backgroundColor: "#edac4a",
                width: '85%',
                height: 35,
                borderRadius: 20,
                padding: 9,
                marginBottom: 8,}}
                onPress={() => setModal(false)}>
                <Text style={styles.textStyle}>Exit</Text>
                </Pressable>
              </View>

            
          </View>
        </View>
      </Modal>
      </View>
    )
};

HisabScreen.navigationOptions =navData => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS ==='android' &&Platform.Version >=21 ){
        TouchableCmp = TouchableNativeFeedback;
    }
    const catId = navData.navigation.getParam('categoryId');
    const title = navData.navigation.getParam('catTitle');
    // const selectedCategory = CATEGORIES.find(cat => cat.id ===catId);
    const color = navData.navigation.getParam('color');
    return {
      headerShown: false,
      headerStyle: {
        backgroundColor: color
      },
        headerTitle:title,
        headerRight:() =>
        <TouchableCmp onPress={()=>
            {
            navData.navigation.navigate('AddItem',{
              categoryId: catId
          })
         }
         }>
            <AntDesign style={styles.icon}
                name="plus" 
                size={30} 
                color={Platform.OS === 'android' ? 'white':'red'}
                
                />
                </TouchableCmp>
    };
};

const styles= StyleSheet.create({
    icon:{
        padding:15
      },
      centered:{
          flex:1, 
          justifyContent:'center', 
          alignItems:'center'
        },
        modalView: {
          margin: 17,
          marginTop:67 ,
          backgroundColor: "#3f4347",
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 30,
          padding: 30,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 5,
          alignItems: 'center'
        },
        button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2
        },
        buttonOpen: {
          backgroundColor: "#F194FF",
        },
        buttonClose: {
          backgroundColor: "#2196F3",
          width: '35%',
          height: 30
        },
        textStyle: {
          color: "white",
          alignSelf: 'center',
          marginTop: -4,
          fontSize: 18
        },
        textStyle1: {
          color: "#d4d4d4",
          fontWeight: "bold",
          fontSize: 15,
          marginLeft: 5
        },
        modalText: {
          marginBottom: 15,
          textAlign: "center"
        },  
        formContainer:{
            width:'100%',
          },
          input:{
              // width:220,
              // borderRadius:10, 
              // borderBottomColor:'black', 
              // borderWidth:1.5,
              // padding:10,
              // marginBottom:10
              height: 44,
              paddingHorizontal:10,
              margin:5,
              marginBottom: 21,
              paddingVertical:5,
              borderWidth:1,
              borderColor:'#ccc',
              backgroundColor:'#6e6e6e',
              borderRadius:7,
    
          },
});
export default HisabScreen;