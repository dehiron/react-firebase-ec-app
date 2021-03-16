import {createSelector} from 'reselect';

const productsSelector = (state) => state.products;

const getProducts = createSelector(
    [productsSelector],
    state => state.list
)

export {getProducts}