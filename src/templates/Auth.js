import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { listenAuthState } from '../reducks/users/operations';
import {getIsSignedIn} from '../reducks/users/selectors'


const Auth = ({children}) => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);

    //ページマウント時の1回目のレンダー後に発生する副作用
    useEffect(() => {
        if (!isSignedIn){
            dispatch(listenAuthState())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if (!isSignedIn){
        //サインインしていない場合に返すコンポーネント
        return <></>
    } else {
        return children
    }
}

export default Auth;