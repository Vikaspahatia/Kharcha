import { StatusBar } from 'expo-status-bar'; 
import React,{useState, useCallback, useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView, Platform,TouchableNativeFeedback, TouchableOpacity, View, Text} from 'react-native';
import {CATEGORIES} from '../data/dummy_data';
import { LinearGradient, colors } from 'expo-linear-gradient';
import Categorygrid from '../components/categorygrid';
import { Octicons } from '@expo/vector-icons';
import {useDispatch, useSelector } from 'react-redux';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as categoryAction from '../store/action/category';
import * as amountAction from '../store/action/amount';
import Moment from 'moment';
import { Entypo } from '@expo/vector-icons';
import Pie from 'react-native-pie'
import {ART} from 'react-native'

const Categoryscreen = (props,{navigation}) => {
    const userId = useSelector(state => state.auth.userId);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS ==='android' &&Platform.Version >=21 ){
        TouchableCmp = TouchableNativeFeedback;
    }
    const dispatch = useDispatch();
    const category = useSelector(state => state.category.availableItems);
    const totalAmount = useSelector(state =>state.amount.availableItems);
    // console.log(parseInt(totalAmount[0].amount),'total-price');   -> to print the totalAmount;
    let date = useSelector(state => state.date.date);
    const loadItems = useCallback( async() =>{
        setError(null);
        setIsLoading(true);
        try {
        await dispatch(categoryAction.fetchCategories(date));
        await dispatch(amountAction.fetchTotal(date));
        } catch(err){
            setError(err.message)
        }
        setIsLoading(false);
    },[dispatch, setIsLoading, setError]);
    useEffect(()=>{
        loadItems();
    },[dispatch, loadItems]);
    useEffect(()=>{

    },[])
    // useEffect(()=>{
    //     dispatch(categoryAction.fetchCategories());
    // },[dispatch])
    const rendergriditem=(itemdata) =>{
        return <SafeAreaView style={{flex: 1}}>
            <TouchableCmp style={ styles.screen} >
            <Categorygrid
                title={itemdata.item.title} 
                color={itemdata.item.color}
                amount={itemdata.item.price}
                onSelect={()=>{
                    props.navigation.navigate({
                    routeName:'Hisab',
                    params:{
                        categoryId: itemdata.item.id,
                        color: itemdata.item.color,
                        catTitle: itemdata.item.title
                    }
        });
      }}/>
      </TouchableCmp>
        </SafeAreaView>;
    }
    return (
        <LinearGradient style={{flex: 1}} colors={["#202427", "#202427"]} start={[1, 1]} end={[0,0]}>
        <StatusBar style="auto" backgroundColor= "#202427"  />
        <View style={{marginBottom: 40}}>
        
        <Octicons name="three-bars" size={25} color="white" onPress={() => {props.navigation.toggleDrawer();}} 
            style={{marginLeft: 20, marginTop: 40}} />
        <Text style={{color:'white', fontSize: 18, alignSelf: 'center', marginTop: -25}}>Hi user</Text>




        {/* <Pie
              radius={80}
              sections={[
                {
                  percentage: 10,
                  color: '#C70039',
                },
                {
                  percentage: 20,
                  color: '#44CD40',
                },
                {
                  percentage: 30,
                  color: '#404FCD',
                },
                {
                  percentage: 40,
                  color: '#EBD22F',
                },
              ]}
              strokeCap = {round}
            /> */}





{/* 
            <AnimatedCircularProgress style={{
                overflow:Platform.OS === 'android' && Platform.Version >= 21 ?'hidden':'visible',
                elevation:5,
                shadowColor:'black',
                shadowOpacity:0.8,
                shadowOffset:{width:2,height:0},
                shadowRadius:10,
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 20
                }}
                size={270}
                width={10}
                fill= {45}
                tintColor="#f5428d"
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#85053a"
                backgroundWidth={10} 
                radius={50}
                radiusWidth={20}
                />

                
            <AnimatedCircularProgress style={{
                shadowOffset: {height: 2, width: 2},
                shadowOpacity: 0.3,
                zIndex: 1,
                alignSelf: 'center',
                marginTop: -280,
                marginBottom: 20
                }}
                size={250}
                width={10}
                fill= {34}
                tintColor="#41d95d"
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#025211"
                backgroundWidth={10} 
                radius={20}
                />

                
            <AnimatedCircularProgress style={{
                shadowOffset: {height: 2, width: 2},
                shadowOpacity: 0.3,
                zIndex: 1,
                alignSelf: 'center',
                marginTop: -260,
                marginBottom: 20
                }}
                size={230}
                width={10}
                fill= {67}
                tintColor="#f5a442"
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#703e01"
                backgroundWidth={10} 
                radius={20}
                />
             
            <AnimatedCircularProgress style={{
                shadowOffset: {height: 2, width: 2},
                shadowOpacity: 0.3,
                zIndex: 1,
                alignSelf: 'center',
                marginTop: -240,
                marginBottom: 20
                }}
                size={210}
                width={10}
                fill= {36}
                
                tintColor="#368dff"
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#012e69"
                
                backgroundWidth={10} 
                radius={20}
                />

                
            <AnimatedCircularProgress style={{
                shadowOffset: {height: 2, width: 2},
                shadowOpacity: 0.3,
                zIndex: 1,
                alignSelf: 'center',
                marginTop: -220,
                marginBottom: 20
                }}
                size={190}
                width={10}
                fill= {57}
                tintColor="#b9ffb0"
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#0e7301"
                backgroundWidth={10} 
                radius={20}
                />

      
            <AnimatedCircularProgress style={{
                shadowOffset: {height: 2, width: 2},
                shadowOpacity: 0.3,
                zIndex: 1,
                alignSelf: 'center',
                marginTop: -200,
                marginBottom: 20
                }}
                size={170}
                width={10}
                fill= {52}
                tintColor="#00e0ff"
                
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                
                backgroundColor="#026d7d"
                backgroundWidth={10} 
                radius={20}
                /> 
     
            
            <AnimatedCircularProgress style={{
                shadowOffset: {height: 2, width: 2},
                shadowOpacity: 0.3,
                zIndex: 1,
                alignSelf: 'center',
                marginTop: -180,
                marginBottom: 20
                }}
                size={150}
                width={10}
                fill= {74}
                tintColor="#f54242"
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#630303"
                backgroundWidth={10} 
                radius={20}
                /> 


            <AnimatedCircularProgress style={{
                shadowOffset: {height: 2, width: 2},
                shadowOpacity: 0.3,
                zIndex: 1,
                alignSelf: 'center',
                marginTop: -160,
                marginBottom: 20
                }}
                size={130}
                width={10}
                fill= {85}
                tintColor="#f5d142"              
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#786102"
                backgroundWidth={10} 
                radius={20}
                /> 
    
            <AnimatedCircularProgress style={{
                overflow:Platform.OS === 'android' && Platform.Version >= 21 ?'hidden':'visible',
                elevation:5,
                shadowColor:'black',
                shadowOpacity:0.8,
                shadowOffset:{width:2,height:0},
                shadowRadius:10,
                alignSelf: 'center',
                marginTop: -140,
                marginBottom: 20
                }}
                size={110}
                width={10}
                fill= {58}
                tintColor="#9eecff"
                
                // onAnimationComplete={() => console.log('onAnimationComplete')}
                
                backgroundColor="#006d87"
                backgroundWidth={10} 
                radius={20}
                shadowColor="#999"
                />  */}

              
        </View>

        <FlatList
            data={category}
            renderItem={rendergriditem}
            numColumns={2}
            keyExtractor={(item, index) =>index.toString()}
        />
        </LinearGradient>
    )
};

Categoryscreen.navigationOptions = navdata =>{
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS ==='android' &&Platform.Version >=21 ){
        TouchableCmp = TouchableNativeFeedback;
    }
    return{
        headerShown: false,
        headerTitle:'Categories',
        headerLeft:() =>
        <TouchableCmp onPress={()=>
            {
            navdata.navigation.toggleDrawer();
         }
         }>
                <Entypo 
                    style={{paddingLeft:5}}
                    name="menu" 
                    size={30} 
                    color={Platform.OS === 'android' ? 'white':'red'} 
                />
                </TouchableCmp>
    };
};

const styles=StyleSheet.create({
    screen:{
        paddingTop:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:15
    },
    
});

export default Categoryscreen;


