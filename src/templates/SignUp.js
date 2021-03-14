import React, {useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, PrimaryButton } from "../components/UIkit";
import { signUp } from '../reducks/users/operations'


const SignUp = () => {

    const dispatch = useDispatch();

    //注意：onChangeと結びつく、メモ化によってパフォーマンスがよくなる。動画で使い方確認。
    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    
    const inputUsername = useCallback((event)=>{
        //onChangeに渡すことになる処理
        //onChangeに渡されたeventに対しての処理を書く。
        setUsername(event.target.value)
    }, [setUsername]);
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
    const inputConfirmPassword = useCallback((event)=>{
        //onChangeに渡すことになる処理
        //onChangeに渡されたeventに対しての処理を書く。
        setConfirmPassword(event.target.value)
    }, [setConfirmPassword]);

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">アカウント登録</h2>
            <div className="module-spacer--medium" />
            <TextInput 
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true} 
                rows={1} value={username} type={"text"} onChange={inputUsername}
            />
            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true} 
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput 
                fullWidth={true} label={"パスワード"} multiline={false} required={true} 
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <TextInput 
                fullWidth={true} label={"パスワード（確認用）"} multiline={false} required={true} 
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"アカウントを登録"}
                    onClick={() => {
                        dispatch(signUp(username, email,password,confirmPassword))
                    }}
                />
            </div>

            
        </div>

    )
};

export default SignUp;
