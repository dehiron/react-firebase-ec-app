import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { getProductsInCart } from '../../reducks/users/selectors'
import { useSelector } from 'react-redux';

const HeaderMenus = (props) => {

    const selector = useSelector((state) => state);
    let ProductsInCart = getProductsInCart(selector);

    return (
        <>
            <IconButton>
                <Badge badgeContent={ProductsInCart.length} color={'secondary'}>
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