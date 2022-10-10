import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';

const CategoryItem = props =>{
    return(
        <View style={styles.categoryItem}>
            <TouchableOpacity onPress={props.onSelectCat}>
                <View>
                    <View style={styles.categoryRow}>
                        <Text style={{fontSize: 18, marginTop: -2, paddingLeft: 4, color: '#ededed', fontWeight: 'bold'}}  >{props.title}</Text>
                        <Text style={{fontSize: 23, marginTop: 5, marginRight: 6, color: '#ededed'}}  >₹ {props.amount}</Text>
                    </View>
                        <Text style={{fontSize: 14, marginTop: -12, color: '#b8b8b8', paddingLeft: 5}}  > {props.description}</Text>
                    <View style={styles.categoryRow}>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    categoryItem:{
        //height:60,
        borderRadius:7,
        margin:10,
        marginTop: 15,
        padding:10,
        overflow:Platform.OS === 'android' && Platform.Version >= 21 ?'hidden':'visible',
        elevation:5,
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:10,
        backgroundColor:'#4e5052', 
    },
    categoryRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        
        // alignItems:'flex-end',
        //padding:10
    }
});

export default CategoryItem;