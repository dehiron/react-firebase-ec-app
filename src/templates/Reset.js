import React, {useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, PrimaryButton } from "../components/UIkit";
import { resetPassword } from '../reducks/users/operations'
import {push} from 'connected-react-router'

const Reset = () => {

    const dispatch = useDispatch();

    //注意：onChangeと結びつく、メモ化によってパフォーマンスがよくなる。動画で使い方確認。
    
    const [email, setEmail]= useState("");
    
    
    const inputEmail = useCallback((event)=>{
        //onChangeに渡すことになる処理
        //onChangeに渡されたeventに対しての処理を書く。
        setEmail(event.target.value)
    }, [setEmail]);

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
            <div className="module-spacer--medium" />
            
            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true} 
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"メールアドレスをリセット"}
                    onClick={() => {
                        dispatch(resetPassword(email))
                    }}
                />
                <div className="module-spacer--medium" />
                <p onClick={()=>{dispatch(push("/signin"))}}>サインイン画面に戻る</p>
            </div>
        </div>

    )
};

export default Reset;
