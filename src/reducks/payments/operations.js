import { CardElement } from "@stripe/react-stripe-js";
import { push } from "connected-react-router";
import { db } from "../../firebase";
import { updateUserStateAction } from '../users/actions'

const headers = new Headers();
headers.set("Content-type", "application/json");
const BASE_URL = "https://react-firebase-ec-app.web.app";


const createCustomer = async (email, paymentMethodId, uid) => {
    //ここがfetchメソッドでcloud functionsのAPIを（エンドポイント経由で）叩いている部分
    const response = await fetch(BASE_URL+"/v1/customer", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            email: email,
            paymentMethod: paymentMethodId,
            userId: uid,
        })
    })

    const customerResponse = await response.json() //jsonの形
    return JSON.parse(customerResponse.body) //Javascriptで扱えるObjectの形にしてリターンする

}

const updatePaymentMethod = async (customerId, prevPaymentMethodId, nextPaymentMethodId) => {
    //ここがfetchメソッドでcloud functionsのAPIを（エンドポイント経由で）叩いている部分
    const response = await fetch(BASE_URL + "/v1/updatePaymentMethod", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            customerId: customerId,
            prevPaymentMethodId: prevPaymentMethodId,
            nextPaymentMethodId: nextPaymentMethodId
        })
    })

    const paymentMethodResponse = await response.json()
    const paymentMethod = JSON.parse(paymentMethodResponse.body);
    return paymentMethod.card
}

//stripeとelementsとは・・
//stripe -> クライアント側から渡されるstripeの情報（paymenEdit内でuseStripeのフックスを使って作成されたもの）
//elements -> checkOutWrapperで定義されている、stipe情報を渡されたelementの情報
export const registerCard = (stripe, elements, customerId) => {
    return async (dispatch, getState) => {
        const user = getState().users
        const email = user.email
        const uid = user.uid
        // const username = user.username

        // stripeで用意されているバリデーション
        // https://stripe.com/docs/stripe-js/reactから
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
        return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);　//hooksで渡ってきたelement内のメソッドを使う
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({ //hooksで渡ってきたstripe情報が入っているstripe内のメソッドを使う
        type: 'card',
        card: cardElement,
        });
    
        if (error) {
        console.log('[error]', error);
        return;
        //   } else {
        //     console.log('[PaymentMethod]', paymentMethod);
        }

        const paymentMethodId = paymentMethod.id

        
        if (customerId === ""){　//初めてカード情報を登録する人用の処理。
            //ここで上のcreateCustomer関数が発火して、fetchでcloud functionsのAPIを(endpoint経由で)叩いている
            const customerData = await createCustomer(email, paymentMethodId, uid)
            if (customerData.id === ""){
                alert("カード情報の登路に失敗しました")
                return;
            } else {
                const updateUserState = {
                    customer_id: customerData.id,
                    payment_method_id: paymentMethodId
                }

                db.collection("users").doc(uid)
                    .update(updateUserState)
                    .then(() => {
                        //ややこしいけど、reducks >> users >> actionsのファイル
                        //reduxのユーザーステートに支払い情報を持たせる
                        dispatch(updateUserStateAction(updateUserState))
                        dispatch(push("/user/mypage"))
                    }).catch((error) => {
                        //stripeとfirestoreのデータ不整合を防ぐため、本来であれば
                        //ここのエラーの場合本体であればDelete Stripe Customerの様な処理を書かなくてはいけない
                        alert("カード情報の登路に失敗しました")
                        return;
                    })
            }
        } else { //既に一度カード情報を登録した人の為の処理、更新のためのdetach/attachのapiを叩ける様にする
            const prevPaymentMethodId = getState().users.payment_method_id
            const updatedPaymentMethod = await updatePaymentMethod(customerId, prevPaymentMethodId, paymentMethodId) //paymentMethodIdは今回更新して新しくなるID

            if (!updatedPaymentMethod) {
                alert("お客様情報の登録に失敗しました")
            } else {
                const userState = {
                    payment_method_id: paymentMethodId
                }
                db.collection("users").doc(uid)
                    .update(userState)
                    .then(()=>{
                        dispatch(updateUserStateAction(userState))
                        alert("お客様情報を更新しました。")
                        dispatch(push("/user/mypage"))
                    }).catch(()=>{
                        alert("お客様情報更新に失敗しました")
                    })
            }

        }
    } 
}

export const retrievePaymentMethod = async (paymentMethodId) => {

    const response = await fetch(BASE_URL+"/v1/paymentMethod", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            paymentMethodId: paymentMethodId,
        })
    })

    const paymentMethodResponse = await response.json()
    const paymentMethod = JSON.parse(paymentMethodResponse.body)
    // console.log(paymentMethod)
    return paymentMethod.card
}

export const createPaymentIntent = async (amount, customerId, paymentMethodId) => {

    const response = await fetch(BASE_URL+"/v1/createPaymentIntent", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            amount: amount,
            customerId: customerId,
            paymentMethodId: paymentMethodId,
        })
    });

    const paymentIntentResponse = await response.json();
    // console.log(paymentIntentResponse.body)
    return JSON.parse(paymentIntentResponse.body)
}