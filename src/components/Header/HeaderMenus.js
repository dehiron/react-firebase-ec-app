import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { getProductsInCart, getUserId } from '../../reducks/users/selectors'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase/index';
// import { BrandingWatermarkTwoTone } from '@material-ui/icons';
// import { fetchProducts } from '../../reducks/products/operations';
import { fetchProductsInCart } from '../../reducks/users/operations'

const HeaderMenus = (props) => {

    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const userId = getUserId(selector);
    let productsInCart = getProductsInCart(selector);

    useEffect(()=> {
        const unsubscribe = db.collection("users").doc(userId).collection("cart")
            .onSnapshot(snapshots => {

                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    const changeType = change.type;

                    switch (changeType){
                        case "added":
                            productsInCart.push(product);
                            break;
                        case "modified":
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id); //findIndex->一個一個見る
                            productsInCart[index] = product;
                            break;
                        case "removed":
                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
                            break;    
                        default:
                            break;
                    }
                });
                dispatch(fetchProductsInCart(productsInCart));
            });
        return () => unsubscribe();
        //クリーンアップ関数：アンマウントした時（画面遷移で別ページとか）にリッスンを解除してくれる
    },[]);


    return (
        <>
            <IconButton>
                <Badge badgeContent={productsInCart.length} color={'secondary'}>
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
            </IconButton>
            <IconButton onClick={(event) => {props.handleDrawerToggle(event)}}>
                <MenuIcon />
            </IconButton>
        </>
    )
};

export default HeaderMenus;