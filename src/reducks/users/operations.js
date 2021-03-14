import {signInAction} from './actions'
import {push} from 'connected-react-router'

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

            // const userData = await emailSignIn(email, password)
            // dispatch(signInAction)({
            //     isSignedIn : true,
            //     uid: "0001",
            //     username: "hide",
            // })
        
        }
    }
}

export {signIn}