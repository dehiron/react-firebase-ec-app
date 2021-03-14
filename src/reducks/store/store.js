import { createStore as reduxCreateStore, combineReducers } from "redux";
//Reducersのインポート
import　{ ProductReducer } from "../products/reducers";
import { UserReducer } from "../users/reducers"

function createStore(){//reduxのcreateStoreの別名
    return reduxCreateStore(
        combineReducers({//reducersをまとめるもの
            products: ProductReducer,
            users: UserReducer,
        })
    );
}

export default createStore