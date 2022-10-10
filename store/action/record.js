import Record from '../../models/record';
export const SET_RECORD = 'SET_RECORD';

export const fetchRecord = () =>{
  return async (dispatch, getState) => {
    const uId = getState().auth.userId;
    try{
    const response = await fetch(`https://kharcha-52413-default-rtdb.firebaseio.com/${uId}.json`);
      if(!response.ok){
        throw new Error('Something went wrong! Try again.');
      }
    const resData = await response.json();
   
    const loadedRecord = [];
    const key = Object.keys(resData);
    var i;
    for(i=0;i<key.length;i++){
        pricekey= Object.keys(resData[key[i]].total);
        if(i === key.length-1){
            loadedRecord.push(new Record(i.toString(), 'This Month', resData[key[i]].total[pricekey[0]].price.toString()));
        } else{
         loadedRecord.push(new Record(i.toString(), key[i], (resData[key[i]].total[pricekey[0]].price.toString())));
        }
    }
    dispatch({type: SET_RECORD, record: loadedRecord.reverse()});
  } catch(err){
      throw err;
  }
  };
};
