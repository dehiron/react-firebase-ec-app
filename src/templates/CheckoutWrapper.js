import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js/pure';
import PaymentEdit from '../components/Payment/PaymentEdit';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HyWOjHBC5oG00I9EEOMuiZlnc3OXu6TJclK5HeBXFVyUsVb5cy9DxM8YDSzItYvNw04w2LZyVQBfcU1cTcf7K7800WDcva7oM');

const CheckoutWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentEdit />
        </Elements>
    )
}

export default CheckoutWrapper;