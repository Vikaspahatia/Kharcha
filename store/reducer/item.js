import {PRODUCTS }  from '../../data/dummy_data';
import {CREATE_ITEM, SET_ITEM, UPDATE_ITEM, DELETE_ITEM} from '../action/item';
import Product from '../../models/product';
const initialState = {
    availableItems : PRODUCTS
};

export default (state = initialState, action) => {
    
    switch(action.type){
        case SET_ITEM :
            return {
                availableItems : action.items
            }
        
        case CREATE_ITEM:
            const newProduct= new Product(
            action.itemData.id, 
            action.catId,
            action.itemData.title,
            action.itemData.description, 
            action.itemData.price.toString(),
            action.itemData.date);
            return {
                ...state,
                availableItems:state.availableItems.concat(newProduct).reverse()
            };
        case UPDATE_ITEM :
            let index = state.availableItems.findIndex(({ id }) => id === action.itemId);
            
            if (index > -1 ) {
                var array=[];
               
              const toIncrement = state.availableItems[index];
              const price = parseInt(action.itemData.price, 10);
              let updatedCartItems;
                    updatedCartItems= new Product(action.itemId, toIncrement.categoryIds,
                    action.itemData.title,action.itemData.description,
                    price.toString(),action.itemData.date);
                   array.push(...state.availableItems.slice(0, index));
               array.push(updatedCartItems);
                    array.push(...state.availableItems.slice(index + 1));
                    state.availableItems=array;
                    return state;
            };
            case DELETE_ITEM:
            
                index = state.availableItems.findIndex(({ id }) => id === action.id);
               if (index > -1 ) {
                   var array=[];
                       array.push(...state.availableItems.slice(0, index));
                       array.push(...state.availableItems.slice(index + 1));
                       state.availableItems=array;
                       
                       return state;
               };
    }
    return state;
}