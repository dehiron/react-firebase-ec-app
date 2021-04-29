const HIDE_LOADING = "HIDE_LOADING";
const hideLoadingAction = () => {
    return {
        type: "HIDE_LOADING",
        payload: {
            state: false,
            text: ""
        }
    }
}

const SHOW_LOADING = "SHOW_LOADING";
const showLoadingAction = (text="loading...") => {
    return {
        type: "SHOW_LOADING",
        payload: {
            state: true,
            text: text
        }
    }
}

export {HIDE_LOADING, hideLoadingAction, SHOW_LOADING, showLoadingAction }