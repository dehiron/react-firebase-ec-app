const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const fetchProductsAction = (products) => {
    return {
        type: "FETCH_PRODUCTS",
        payload: products
    }
}

export {FETCH_PRODUCTS, fetchProductsAction}