import { createSelector } from 'reselect'

const usersSelector = (state) => state.users;

const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
);

const getUserId = createSelector(
    [usersSelector],
    state => state.uid
);

const getUserName = createSelector(
    [usersSelector],
    state => state.username
);

const getProductsInCart = createSelector(
    [usersSelector],
    state => state.cart
);

const getOrdersHistory = createSelector(
    [usersSelector],
    state => state.orders
);

const getCustomerId = createSelector(
    [usersSelector],
    state => state.customer_id
);

const getPaymentMethodId = createSelector(
    [usersSelector],
    state => state.payment_method_id
);

export {getUserId, getUserName, getIsSignedIn, getProductsInCart, getOrdersHistory, getCustomerId, getPaymentMethodId};