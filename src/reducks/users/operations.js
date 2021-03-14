import {signInAction} from './actions'
import {push} from 'connected-react-router'
import {auth, db, FirebaseTimestamp} from '../../firebase/index'


const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validation
        if (username === "" || email === "" || password === "" || confirmPassword === ""){
            alert("必須項目です")
            return false
        }
        if (password !== confirmPassword){
            alert("パスワードが一致しません")
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user

            if(user){
                const uid = user.uid
                const timestamp = FirebaseTimestamp.now()

                const userInitialData = {
                    created_at: timestamp,
                    email: email,
                    role: "customer",
                    uid: uid,
                    updated_at: timestamp,
                    username: username
                }

                db.collection("users").doc(uid).set(userInitialData)
                    .then(()=>{
                        dispatch(push("/"))
                    })
            }
        })
    }
}


const signIn = (email, password) => {
    return async (dispatch, getState) => {
        
        const state = getState(); //メソッドとして呼び出す為()が必須
        const isSignedIn = state.users.isSignedIn
        
        if (!isSignedIn) {

            const url = "https://api.github.com/users/dehiron"

            const response = await fetch(url)
                                .then(res => res.json())
                                .catch(() => null)
            
            const username = response.login

            dispatch(signInAction({
                isSignedIn: true,
                uid: "0001",
                username: username
            }))
            dispatch(push("/"))
        }
    }
}


export {signIn, signUp}