import React,{useEffect, useReducer} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';


const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const inputReducer = (state, action) =>{
        switch(action.type){
            case INPUT_CHANGE:
                return{
                    ...state,
                    value: action.value,
                    isValid: action.isValid
                };
            case INPUT_BLUR:
                return{
                    ...state,
                    touched: true
                }
            default:
            return state;
        }
};

const Input  = props =>{

    const [inputState, dispatch ] = useReducer(inputReducer,{
        value: props.initialValue,
        isValid :props.initiallyValid,
        touched: false
    })

    const titleHandler = text =>{
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid
        });
    };

    const lostFocusHandler = () =>{
        dispatch({type:INPUT_BLUR})
    };

    const {onInputChange} = props;
    useEffect(()=>{
        if(inputState.touched){
            onInputChange(inputState.value, inputState.isValid);
        }
    },[inputState, onInputChange]);

    return (
        <View style={styles.formContainer}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput 
                    {...props}
                    style={styles.input}
                    value={inputState.value}
                    onChangeText={titleHandler}
                    onBlur = {lostFocusHandler}
                />
                {!inputState.isValid && <Text>{props.errorText}</Text>}
                </View>
    )
};

const styles  = StyleSheet.create({
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

          paddingHorizontal:10,
          margin:15,
          paddingVertical:5,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          borderWidth:1,
          borderColor:'#ccc',
          borderRadius:10,

      }, 
      label: {
          marginVertical: 8
      }

});

export default Input;