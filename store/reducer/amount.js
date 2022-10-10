import {AMOUNT}  from '../../data/dummy_data';
import Amount from '../../models/amount';
import {SET_AMOUNT, CREATE_AMOUNT, UPDATE_AMOUNT, UPDATE_EDIT_AMOUNT} from '../action/amount';
const initialState = {
    availableItems : AMOUNT
};

export default (state = initialState, action) => {
    switch(action.type){
        case SET_AMOUNT :
            return {
                availableItems : action.amount
            }
        case CREATE_AMOUNT:
                const newAmount= new Amount(
                action.id,
                action.price);
                return {
                    ...state,
                    availableItems:state.availableItems.concat(newAmount),
                    // totalAmount: state.totalAmount
                };

        case UPDATE_AMOUNT:
            let index = state.availableItems.findIndex(({ id }) => id === action.tId);
            
            if (index > -1 ) {
                var array=[];
                
                const toIncrement = state.availableItems[index];
                const price = parseInt(action.price, 10);
                // let updatedCartItems;
                //     updatedCartItems= new Amount(action.tId,
                //     price.toString());
                //     array.push(updatedCartItems);
                //     state.availableItems=array;
                toIncrement.amount = price.toString();
                    return state;
            };
            return state;
        case UPDATE_EDIT_AMOUNT:
                index = state.availableItems.findIndex(({ id }) => id === action.tId);
                
                if (index > -1 ) {
                    var array=[];
                    
                    const toIncrement = state.availableItems[index];
                    const price =parseInt(action.price, 10) + parseInt(toIncrement.amount) - parseInt(action.prevPrice);
                    let updatedCartItems;
                        updatedCartItems= new Amount(action.tId, price.toString());
                    array.push(updatedCartItems);
                        state.availableItems=array;
                    //    state.totalAmount+= parseInt(action.itemData.price, 10)- parseInt(action.itemData.prevPrice);
                        
                }
                return state;
        default:
                return state;
            }
        }