import React, {useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, PrimaryButton } from "../components/UIkit";
import { signIn } from '../reducks/users/operations';
import { push } from 'connected-react-router';



const SignIn = () => {

    const dispatch = useDispatch();

    //注意：onChangeと結びつく、メモ化によってパフォーマンスがよくなる。動画で使い方確認。
    
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    
    
    const inputEmail = useCallback((event)=>{
        //onChangeに渡すことになる処理
        //onChangeに渡されたeventに対しての処理を書く。
        setEmail(event.target.value)
    }, [setEmail]);
    const inputPassword = useCallback((event)=>{
        //onChangeに渡すことになる処理
        //onChangeに渡されたeventに対しての処理を書く。
        setPassword(event.target.value)
    }, [setPassword]);

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">サインイン</h2>
            <div className="module-spacer--medium" />
            
            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true} 
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput 
                fullWidth={true} label={"パスワード"} multiline={false} required={true} 
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"サインイン"}
                    onClick={() => {
                        dispatch(signIn(email,password))
                    }}
                />
                <div className="module-spacer--medium" />
                <p onClick={()=>{dispatch(push("/signup"))}}>アカウントをお持ちでない方はこちら</p>
                <p onClick={()=>{dispatch(push("/signin/reset"))}}>パスワードをお忘れの方はこちら</p>
            </div>

            
        </div>

    )
};

export default SignIn;
