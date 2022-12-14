import {AUTHENTICATE, LOGOUT } from '../action/auth';
const initialState = {
    token : null,
    userId: null
};

export default (state = initialState , action) =>{
    switch(action.type){
        case AUTHENTICATE :
            return{
                token: action.token,
                userId: action.userId
            };
        case LOGOUT:
            return initialState;
    }
    return state;
}