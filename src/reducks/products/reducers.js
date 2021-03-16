import * as Actions from './actions';
import initialState from '../store/initialState';

const ProductsReducer = (state = initialState.products, action) => {
    switch (action.type){
        case Actions.FETCH_PRODUCTS:
            return {
                ...state,
                list: [...action.payload] //[...]の書き方でstoreの中でのメモリ情報が書き換わって新しい配列として認識してくれる。コンポーネント内での更新認識の部分で◎
            }
        case Actions.DELETE_PRODUCTS:
            return {
                ...state,
                list: [...action.payload]
            }

        default: return state
    }
}

export { ProductsReducer }