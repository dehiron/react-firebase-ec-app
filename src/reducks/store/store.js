import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
//Reducersのインポート
import { connectRouter, routerMiddleware } from 'connected-react-router';
// import　{ ProductReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';

function createStore(history){
    return reduxCreateStore(
        combineReducers({
            // products: ProductReducer,
            users: UsersReducer,
            router: connectRouter(history),
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    );
}

export default createStore