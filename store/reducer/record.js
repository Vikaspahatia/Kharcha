import {SET_RECORD} from '../action/record';
import {RECORD} from '../../data/dummy_data';
const initialState = {
    availableRecord: RECORD
};

export default (state = initialState, action) => {
    switch(action.type){
        case SET_RECORD:{
            return{
                availableRecord: action.record
            }
        }
        default: 
            return state;
    }
}