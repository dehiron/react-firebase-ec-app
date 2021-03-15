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
        default: return state
    }
}

export { UsersReducer }