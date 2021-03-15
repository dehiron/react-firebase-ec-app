const SIGN_IN = "SIGN_IN";
const signInAction = (userState) => {
    return{
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
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

export { SIGN_IN, signInAction, SIGN_OUT, signOutAction }