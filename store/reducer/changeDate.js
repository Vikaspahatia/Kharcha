import {GET_DATE} from '../action/changeDate';

const initialState = {
    date: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_DATE:{
            return{
                date: action.date
            }
        }
        default: 
            return state;
    }
}