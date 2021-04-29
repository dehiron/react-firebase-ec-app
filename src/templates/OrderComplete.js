import { push } from 'connected-react-router';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../components/UIkit';

const OrderComplete = () => {

    const dispatch = useDispatch();

    const goBackToTop = useCallback(()=>{
        dispatch(push("/"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="c-section-container">
            <p>ご注文ありがとうございました</p>
            <div className="module-spacer--medium" />
            <PrimaryButton label="ショッピングを続ける" onClick={()=>{goBackToTop()}} />
        </div>
    )
}

export default OrderComplete;