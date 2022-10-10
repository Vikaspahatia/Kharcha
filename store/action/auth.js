import {AsyncStorage} from 'react-native';
export const SIGNUP ='SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE= 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authentication = (userId, token) =>{
  return dispatch =>{
    // dispatch(setLogoutTimer(expiryDate));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token});
  }
};


export const signup = (email, password ) =>{
    return async dispatch =>{
      let response;
      try{
    response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdMJ_zVq9aHxTzwZU-R22w-4ECB3t5-B8',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
              })
            });
      } catch(err){
        throw new Error(err.message);
      }
      if(!response.ok){
        const errorResData  = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went Wrong!';
        if(errorId === 'EMAIL_EXISTS'){
          message = 'This email already exists!'
        } 

        throw new Error(message);
    }
        const resData = await response.json();
        // dispatch(authentication(resData.localId, resData.idToken, parseInt(resData.expiresIn)*1000 ));
        dispatch(authentication(resData.localId, resData.idToken));
        const expirationDate  = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      // saveDataToStorage(resData.idToken, resData.localId, expirationDate, resData.email);
      saveDataToStorage(resData);
    }
};




export const login = (email, password ) =>{
  return async dispatch =>{
    let response;
    try{
  response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdMJ_zVq9aHxTzwZU-R22w-4ECB3t5-B8',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true
            })
          });
    } catch(err){
      throw new Error(err.message);
    }
    console.log(response.ok);
      if(!response.ok){
          const errorResData  = await response.json();
          console.log(errorResData);
          const errorId = errorResData.error.message;
          let message = 'Something went Wrong!';
          if(errorId === 'EMAIL_NOT_FOUND'){
            message = 'This email could not be found!'
          } else if(errorId === 'INVALID_PASSWORD'){
            message = 'Password is not valid';
          }

          throw new Error(message);
      }
      const resData = await response.json();
      dispatch(authentication(resData.localId, resData.idToken));
      // dispatch(authentication(resData.localId, resData.idToken, parseInt(resData.expiresIn)*1000 ));
      const expirationDate  = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      // saveDataToStorage(resData.idToken, resData.localId, expirationDate, resData.email);
      saveDataToStorage(resData);
  }
};


export const deleteAccount = () =>{
  return async (dispatch, getState) =>{
    const token =getState().auth.token;
    let response;
    try{
  response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDdMJ_zVq9aHxTzwZU-R22w-4ECB3t5-B8',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token:token
            })
          });
    } catch(err){
      throw new Error(err.message);
    }
    if(!response.ok){
      const errorResData  = await response.json();
      console.log(errorResData);
      const errorId = errorResData.error.message;
      let message = 'Something went Wrong!';
      if(errorId === 'INVALID_ID_TOKEN'){
        message = 'Please Login Again!!'
      } else if(errorId === "USER_NOT_FOUND"){
        message = 'User Not Found';
      }
      throw new Error(message);
  }
      // dispatch(authentication(resData.localId, resData.idToken, parseInt(resData.expiresIn)*1000 ));
      dispatch({type: LOGOUT});
  }
};



export const forgotPassword = (email) =>{
  return async dispatch =>{
    let response;
    try{
  response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDdMJ_zVq9aHxTzwZU-R22w-4ECB3t5-B8',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              requestType:"PASSWORD_RESET" 
            })
          });
    } catch(err){
      throw new Error(err.message);
    }
      if(!response.ok){
          const errorResData  = await response.json();
          console.log(errorResData);
          const errorId = errorResData.error.message;
          let message = 'Something went Wrong!';
          if(errorId === 'EMAIL_NOT_FOUND'){
            message = 'This email could not be found!'
          } 

          throw new Error(message);
      }
      // const resData = await response.json();
      // dispatch(authentication(resData.localId, resData.idToken));
      // // dispatch(authentication(resData.localId, resData.idToken, parseInt(resData.expiresIn)*1000 ));
      // const expirationDate  = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      // saveDataToStorage(resData.idToken, resData.localId, expirationDate, resData.email);
  }
};


export const updateProfile = (displayName, photoUrl ) =>{
  return async (dispatch, getState) =>{
    const token = getState().auth.token;
    let response;
    try{
  response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDdMJ_zVq9aHxTzwZU-R22w-4ECB3t5-B8',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token:token,
              displayName:displayName,
              email: email,
              photoUrl: photoUrl,
              returnSecureToken: true
            })
          });
    } catch(err){
      throw new Error(err.message);
    }
      if(!response.ok){
          const errorResData  = await response.json();
          const errorId = errorResData.error.message;
          let message = 'Something went Wrong!';
          if(errorId === 'EMAIL_NOT_FOUND'){
            message = 'This email could not be found!'
          } else if(errorId === 'INVALID_PASSWORD'){
            message = 'Password is not valid';
          }

          throw new Error(message);
      }
      const resData = await response.json();
      dispatch(authentication(resData.localId, resData.idToken));
      // dispatch(authentication(resData.localId, resData.idToken, parseInt(resData.expiresIn)*1000 ));
      const expirationDate  = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      // saveDataToStorage(resData.idToken, resData.localId, expirationDate, resData.email);
      saveDataToStorage(resData);
  }
};



export const logout = ()=>{
  // clearLogoutTimer();
  // AsyncStorage.removeItem('userData');
  return {type: LOGOUT };
};

// const clearLogoutTimer = ()=>{
//   if(timer){
//     clearTimeout(timer);
//   }
// };


// const setLogoutTimer = expirationTime =>{
//   return dispatch =>{
//     timer = setTimeout(()=>{
//       dispatch(logout());
//     }, expirationTime);
//   }
// }


// const saveDataToStorage = (token, userId, expirationDate, email) =>{
//     AsyncStorage.setItem('userData', JSON.stringify({
//       token:token,
//       userId:userId,
//       expiryDate: expirationDate.toISOString(),
//       email: email
//     }))
// }


const saveDataToStorage = (resData) =>{
  AsyncStorage.setItem('userData', JSON.stringify({
    resData
  }))
}