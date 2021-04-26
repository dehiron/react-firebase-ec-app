const SIGN_IN = "SIGN_IN";
const signInAction = (userState) => {
    return{
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            email:userState.email,
            role: userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
};

const SIGN_OUT = "SIGN_OUT";
const signOutAction = () => {
    return{
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            role:"",
            uid: "",
            username: ""
        }
    }
};

const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
const fetchProductsInCartAction = (products) => {
    return{
        type: "FETCH_PRODUCTS_IN_CART",
        payload: products
    }
};

const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
const fetchOrdersHistoryAction = (history) => {
    return{
        type: "FETCH_ORDERS_HISTORY",
        payload: history
    }
};

const UPDATE_USER_STATE = "UPDATE_USER_STATE";
const  updateUserStateAction = (userState) => {
    return{
        type: "UPDATE_USER_STATE",
        payload: userState
    }
};

export { SIGN_IN, signInAction, SIGN_OUT, signOutAction, FETCH_PRODUCTS_IN_CART, fetchProductsInCartAction, FETCH_ORDERS_HISTORY, fetchOrdersHistoryAction, UPDATE_USER_STATE, updateUserStateAction }