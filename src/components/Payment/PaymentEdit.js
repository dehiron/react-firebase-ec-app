import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { PrimaryButton, TextDetail } from '../UIkit';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { registerCard, retrievePaymentMethod, createSubscription } from '../../reducks/payments/operations';
import {getCustomerId, getPaymentMethodId} from "../../reducks/users/selectors"


const PaymentEdit = () => {

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const stripe = useStripe(); //stripeのフックス
    const elements = useElements(); //stripeのフックス
    //カード情報を登録している人であれば自動的に取得される
    const customerId = getCustomerId(selector)
    const paymentMethodId = getPaymentMethodId(selector)
    //カード情報を登録している人であれば自動的に取得される
    

    const [card, setCard] = useState({});

    const register = useCallback(() => {
        dispatch(registerCard(stripe, elements, customerId)) //reduxから
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[stripe, elements, customerId])

    const subscription = useCallback(async () => {
        console.log(1)
        console.log(customerId)
        const sub = await createSubscription(customerId, paymentMethodId)
        // dispatch(createSubscription(customerId)) //reduxから
        console.log(sub)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const goBackToMyPage = useCallback(()=>{
        dispatch(push("/user/mypage"))
    },[dispatch])


    //カード情報を登録している人であれば自動的にカード情報が取得される
    useEffect(()=>{ 
        (async() => {
            const cardData = await retrievePaymentMethod(paymentMethodId) //operationsから渡される
            if (cardData) {
                setCard(cardData)
            }
        })()
    },[paymentMethodId])

    //第二引数の値が変更されたら再計算してconstで定義されている定数に渡す
    const cardNumber = useMemo(() => {
        if(card.last4){
            return "**** **** **** " + card.last4
        } else {
            return "未登録"
        }
    },[card])

    console.log(selector)

    return (
        <section className="c-section-container">
            <h2 className="u-text__headline u-text-center">クレジットカード情報の登録・編集</h2>
            
            <div className="module-spacer--medium" />
            
            <h3>現在登録されているカード情報</h3>
            
            <div className="module-spacer--small" />

            <TextDetail label={card.brand} value={cardNumber} />

            <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton 
                    label = {"カード情報を保存する"}
                    onClick={register}
                />
                <PrimaryButton 
                    label = {"サブスクテスト"}
                    onClick={subscription}
                />
                <PrimaryButton 
                    label = {"マイページに戻る"}
                    onClick={goBackToMyPage}
                />
            </div>
        </section>
    ) 
}

export default PaymentEdit;