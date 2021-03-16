const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const fetchProductsAction = (products) => {
    return {
        type: "FETCH_PRODUCTS",
        payload: products
    }
}

const DELETE_PRODUCTS = "DELETE_PRODUCTS";
const deleteProductAction = (products) => {
    return {
        type: "DELETE_PRODUCTS",
        payload: products
    }
}

export {FETCH_PRODUCTS, fetchProductsAction, DELETE_PRODUCTS, deleteProductAction}