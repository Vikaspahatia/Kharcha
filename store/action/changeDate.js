import {AsyncStorage} from 'react-native';
export const GET_DATE = 'GET_DATE';

export const fetchMonthly = () =>{
    return async (dispatch, getState) => {
        const uId = getState().auth.userId;
      try{
      const response = await fetch(`https://kharcha-52413-default-rtdb.firebaseio.com/${uId}.json`);
        if(!response.ok){
          throw new Error('Something went wrong! Try again.');
        }
      const resData = await response.json();
      if(resData!=null){
      const key = Object.keys(resData);
      // console.log(resData);
      // const loadedCategory = [];
      // for(const key in resData){
      //   loadedCategory.push(new Category(key, resData[key].title, resData[key].color, resData[key].price));
      // }
      dispatch({type: GET_DATE, date:key[key.length-1]});
      saveDataToStorage(key[key.length-1]);
      }
    } catch(err){
        throw err;
    }
    };
  };


  const saveDataToStorage = (data) =>{
    AsyncStorage.setItem('month', JSON.stringify({
      data
    }))
  }