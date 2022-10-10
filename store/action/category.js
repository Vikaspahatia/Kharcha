import Category from '../../models/category';
export const UPDATE_PRICE = 'UPDATE_PRICE';
export const UPDATE_EDIT_AMOUNT = 'UPDATE_EDIT_AMOUNT';
export const SET_CATEGORY = 'SET_CATEGORY';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';

export const updateAmount = (date,catId, price) => {
  return async (dispatch,getState ) =>{
    const token =getState().auth.token;
    const uId = getState().auth.userId;
    const response = await fetch(
      `https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${date}/categories/${catId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price,
      })
    }); 

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch ({
      type: UPDATE_PRICE,
      catId: catId,
      itemData: {
        price
      }
    });
  };
  };    
export const updateEditAmount = (date,catId, price, prevPrice) =>{
  return async (dispatch,getState ) =>{
    const token =getState().auth.token;
    const uId = getState().auth.userId;
    const response = await fetch(
      `https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${date}/categories/${catId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price
      })
    }); 
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch ({
      type: UPDATE_EDIT_AMOUNT,
    catId: catId,
    itemData :{
      price,
      prevPrice
    }
    });
  };
}


export const fetchCategories = (date) =>{
  return async (dispatch, getState) => {
    const uId = getState().auth.userId;
    try{
    const response = await fetch(`https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${date}/categories.json`);
      if(!response.ok){
        throw new Error('Something went wrong! Try again.');
      }
    const resData = await response.json();
    const loadedCategory = [];
    for(const key in resData){
      loadedCategory.push(new Category(key, resData[key].title, resData[key].color, resData[key].price));
    }
    dispatch({type: SET_CATEGORY, categories: loadedCategory});
  } catch(err){
      throw err;
  }
  };
};




export const createCategory = (date, title, color, price) => {
  return async (dispatch,getState ) => {
    // console.log(getState());
    const token =getState().auth.token;
    const uId = getState().auth.userId;
    try{
    const response = await fetch(`https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${date}/categories.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        color,
        price
      })
    });
    if(!response.ok){
      throw new Error('Check the network Connection! Try again.');
      
    }
    const resData = await response.json();
    dispatch({
      type: CREATE_CATEGORY,
      itemData: {
        id: resData.name,
        title,
        color,
        price,
      }
    });
  } catch(err){
    throw(err);
  }
  };    
};
