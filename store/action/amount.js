import Amount from '../../models/amount';
export const UPDATE_AMOUNT = 'UPDATE_AMOUNT';
export const UPDATE_EDIT_AMOUNT = 'UPDATE_EDIT_AMOUNT';
export const SET_AMOUNT = 'SET_AMOUNT';
export const CREATE_AMOUNT = 'CREATE_AMOUNT';
export const updateTotalAmount = (date,tId, price) => {
  return async (dispatch,getState ) =>{
    const token =getState().auth.token;
    const uId = getState().auth.userId;
    const response = await fetch(
      `https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${date}/total/${tId}.json`, {
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
      type: UPDATE_AMOUNT,
      tId: tId,
      price: price
    });
  };
  };    
export const updateEditTotalAmount = (date,tId, price, prevPrice) =>{
  return async (dispatch,getState ) =>{
    const token =getState().auth.token;
    const uId = getState().auth.userId;
    const response = await fetch(
      `https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${date}/total/${tId}.json`, {
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
    tId: tId,
      price,
      prevPrice
    });
  };
}


export const fetchTotal = (date) =>{
  return async (dispatch, getState) => {
    const uId = getState().auth.userId;
    try{
    const response = await fetch(`https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${date}/total.json`);
      if(!response.ok){
        throw new Error('Something went wrong! Try again.');
      }
    const resData = await response.json();
   
    const loadedAmount = [];
    for(const key in resData){
        loadedAmount.push(new Amount(key, resData[key].price));
    }
    
    dispatch({type: SET_AMOUNT, amount: loadedAmount});
  } catch(err){
      throw err;
  }
  };
};



export const createAmount = (date,price) => {
    return async (dispatch,getState ) => {
      // console.log(getState());
      const token =getState().auth.token;
      const uId = getState().auth.userId;
      try{
      const response = await fetch(`https://kharcha-52413-default-rtdb.firebaseio.com/${uId}/${date}/total.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price: price
        })
      });
      if(!response.ok){
        throw new Error('Check the network Connection! Try again.');
        
      }
      const resData = await response.json();
      dispatch({
        type: CREATE_AMOUNT,
        itemData: {
          id: resData.name,
          price,
        }
      });
    } catch(err){
      throw(err);
    }
    };    
  };
  