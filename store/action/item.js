import Product from '../../models/product';
export const CREATE_ITEM = 'CREATE_ITEM';
export const SET_ITEM = 'SET_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const deleteItem = (dateFire,itemId) => {
  return async (dispatch, getState ) =>{
    const token =getState().auth.token;
    const uId = getState().auth.userId;
    await fetch(
      `https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${dateFire}/items/${itemId}.json`, {
      method: 'DELETE'
    }); 
    dispatch ({ type: DELETE_ITEM, id: itemId });
  }
  
};


// mere gubbu oye tanu miss you 
export const fetchItems = (dateFire) =>{
  return async (dispatch,getState) => {
    const token =getState().auth.token;
    const uId = getState().auth.userId;
    try{
    const response = await fetch(`https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${dateFire}/items.json`);
      if(!response.ok){
        throw new Error('Something went wrong! Try again.');
      }
    const resData = await response.json();
    const loadedItems = [];
    for(const key in resData){
      loadedItems.push(new Product(key, resData[key].catId, resData[key].title, resData[key].description, resData[key].price, resData[key].date));
    }
    dispatch({type: SET_ITEM, items: loadedItems.reverse()});
  } catch(err){
      throw err;
  }
  };
};

export const createItem = (dateFire,catId, title, description, price, date) => {
  return async (dispatch,getState ) => {
    const token =getState().auth.token;
    const uId = getState().auth.userId;
    try{
    const response = await fetch(`https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${dateFire}/items.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        catId,
        title,
        description,
        price,
        date:date
      })
    });
    if(!response.ok){
      throw new Error('Check the network Connection! Try again.');
      
    }
    const resData = await response.json();
    dispatch({
      type: CREATE_ITEM,
      catId: catId,
      itemData: {
        id: resData.name,
        title,
        description,
        price,
        date
      }
    });
  } catch(err){
    throw(err);
  }
  };    
};

export const updateItem = (dateFire,itemId, title ,description, price, date ) =>{
  return async (dispatch,getState ) =>{
    const token =getState().auth.token;
    const uId = getState().auth.userId;
    const response = await fetch(
      `https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${dateFire}/items/${itemId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        price,
        date
      })
    }); 

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch ({
      type: UPDATE_ITEM,
      itemId,
      itemData :{
        title,
        description,
        price,
        date
      }
    });
  };
};