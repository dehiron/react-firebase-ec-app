import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
//Reducersのインポート
import { connectRouter, routerMiddleware } from 'connected-react-router';
import　{ ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';

function createStore(history){


    const middleWares = [routerMiddleware(history), thunk]

    if (process.env.NODE_ENV === "development") {
        const logger = createLogger({
            collapsed: true,
            diff: true
        })
        middleWares.push(logger)
    }

    return reduxCreateStore(
        combineReducers({
            // products: ProductReducer,
            users: UsersReducer,
            products: ProductsReducer,
            router: connectRouter(history),
        }),
        applyMiddleware(...middleWares)
    );
}

export default createStore