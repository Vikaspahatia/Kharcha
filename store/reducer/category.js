import {CATEGORIES}  from '../../data/dummy_data';
import {UPDATE_PRICE, UPDATE_EDIT_AMOUNT, SET_CATEGORY, CREATE_CATEGORY} from '../action/category';
import Category from '../../models/category';
const initialState = {
    availableItems : CATEGORIES
};

export default (state = initialState, action) => {
    switch(action.type){
        case SET_CATEGORY :
            return {
                availableItems : action.categories
            }
        case CREATE_CATEGORY:
                const newCategory= new Category(
                action.id,
                action.title,
                action.color, 
                action.price);
                return {
                    ...state,
                    availableItems:state.availableItems.concat(newCategory),
                    // totalAmount: state.totalAmount
                };
        case UPDATE_PRICE:
            let index = state.availableItems.findIndex(({ id }) => id === action.catId);
            
            if (index > -1 ) {
                var array=[];
               
              const toIncrement = state.availableItems[index];
              const price = parseInt(action.itemData.price, 10);
              let updatedCartItems;
                    updatedCartItems= new Category(action.catId,
                    toIncrement.title,toIncrement.color,
                    price.toString());
                    // console.log(updatedCartItems, 'updatedcatitems');
              // create new object with existing data and newly incremented number
            //   const updatedData =  {...toIncrement};
            //     const updatedObject = new Category();
            //     updatedObject=updatedData;
            //     console.log(updatedObject,'object');
              // return new array that replaces old object with incremented object at index
             // the state is not getting updated with the following:
                // console.log(...state.availableItems.slice(0, index), updatedObject, ...state.availableItems.slice(index + 1),'slice');
                array.push(...state.availableItems.slice(0, index));
                // console.log(array,'array1');
               
                // return array;
            // return [...state.availableItems.slice(0, index), updatedObject, ...state.availableItems.slice(index + 1)];
            
            // const selectedCartItem=state.availableItems.filter(meal => meal.id.indexOf(action.catId) >= 0);
            // console.log(selectedCartItem,'ygvudhbk');
            // const currentQty=selectedCartItem.price;
            
                    array.push(updatedCartItems);
                    // console.log(array,'array2');
                    array.push(...state.availableItems.slice(index + 1));
                    // console.log(array,'array');
                    state.availableItems=array;
                    // state.totalAmount+= parseInt(action.itemData.price, 10);
                    return state;
            // return {
            //     ...state,
            //     availableItems:updatedCartItems
            };
            return state;
        case UPDATE_EDIT_AMOUNT:
                index = state.availableItems.findIndex(({ id }) => id === action.catId);
               
               if (index > -1 ) {
                   var array=[];
                  
                 const toIncrement = state.availableItems[index];
                 const price =parseInt(action.itemData.price, 10) + parseInt(toIncrement.price) - parseInt(action.itemData.prevPrice);
                //  console.log(toIncrement, price , 'reducer');
                 let updatedCartItems;
                       updatedCartItems= new Category(action.catId,
                       toIncrement.title,toIncrement.color,
                       price.toString());
                   array.push(...state.availableItems.slice(0, index));
                   array.push(updatedCartItems);
                       // console.log(array,'array2');
                       array.push(...state.availableItems.slice(index + 1));
                       // console.log(array,'array');
                       state.availableItems=array;
                    //    state.totalAmount+= parseInt(action.itemData.price, 10)- parseInt(action.itemData.prevPrice);
                       return state;
               }
               return state;
    }
    return state;
}