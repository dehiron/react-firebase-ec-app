import {signInAction, signOutAction, fetchProductsInCartAction, fetchOrdersHistoryAction} from './actions'
import {push} from 'connected-react-router'
import {auth, db, FirebaseTimestamp} from '../../firebase/index'


const fetchProductsInCart = (products) => {
    return async (dispatch) => {
        dispatch(fetchProductsInCartAction(products))
    }
}

const fetchOrdersHistory = () => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const list = [];

        db.collection("users").doc(uid)
            .collection("orders")
            .orderBy("updated_at", "desc")
            .get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    list.push(data)
                })
                dispatch(fetchOrdersHistoryAction(list))
            })
    }
}

const addProductToCart = (addedProduct) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const cartRef = db.collection("users").doc(uid).collection("cart").doc(); //コレクション内にサブコレクションを作る
        addedProduct["cartId"] = cartRef.id; //自分自身のカードIDを持たせる
        await cartRef.set(addedProduct);
        dispatch(push("/")); //一旦ホームに戻る
    }
}

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
    return async (dispatch) => {
        // Validation
        if (email === "" || password === ""){
            alert("必須項目です")
            return false
        }
        
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if (user) {
                    const uid = user.uid
                    db.collection("users").doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                customer_id: (data.customer_id) ? data.customer_id : "",
                                isSignedIn: true,
                                email:data.email,
                                role: data.role,
                                payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                                uid: uid,
                                username: data.username
                            }))

                            dispatch(push("/"))
                        })
                }
            })


    
    }
}

const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(()=>{
                dispatch(signOutAction());
                dispatch(push('/signin'))
            })
    } 
}

const resetPassword = (email) => {
    return async (dispatch) => {
        if(email === ""){
            alert("必須項目が未入力です")
            return false
        } else {
            auth.sendPasswordResetEmail(email)
                .then(()=>{
                    alert("入力されたメールアドレスにパスワードリセット用のメールを送りしました。")
                    dispatch(push("/signin"))
                }).catch(()=>{
                    alert("パスワードリセットに失敗しました。")
                })
        }
    }
}

//認証リッスン用関数
const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {//認証完了している状態
                
                const uid = user.uid

                db.collection("users").doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()

                        dispatch(signInAction({
                            customer_id: (data.customer_id) ? data.customer_id : "",
                            isSignedIn: true,
                            email:data.email,
                            role: data.role,
                            payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                            uid: uid,
                            username: data.username
                        }))
                        // dispatch(push("/"))
                    })
            } else {//認証完了していなければ
                dispatch(push("/signin"))
            }
        })

    }
}


export {signIn, signUp, signOut, resetPassword, listenAuthState, addProductToCart, fetchProductsInCart, fetchOrdersHistory}