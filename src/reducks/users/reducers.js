import * as Actions from './actions';
import initialState from '../store/initialState';

const UsersReducer = (state = initialState.users, action) => {
    switch (action.type){
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SIGN_OUT:
            return {
                // ...state, 上書きの概念
                ...action.payload
            }
        case Actions.FETCH_PRODUCTS_IN_CART:
            return {
                ...state,
                cart: [...action.payload]
            }
        case Actions.FETCH_ORDERS_HISTORY:
            return {
                ...state,
                orders: [...action.payload] //配列が渡ってきてる
            }
        case Actions.UPDATE_USER_STATE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

export { UsersReducer }