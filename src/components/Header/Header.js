import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/image/icons/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import { push } from 'connected-react-router';
import {HeaderMenus, ClosableDrawer} from './index';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444",
    },
    toolBar: {
        margin: "0 auto",
        maxWidth: 1024,
        width: "100%"
    },
    iconButtons: { //右寄せするためのスタイル
        margin: "0 0 0 auto"
    }

})

const Header = () => {

    const classes = useStyles();
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const isSignedIn = getIsSignedIn(selector);


    const [open, setOpen] = useState(false);

    const handleDrawerToggle = useCallback((event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setOpen(!open)
    },[setOpen, open])

    //MaterialUIのAppBarを活用
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <img src={logo} alt="eventclip logo" width="128px"
                        onClick = {() => {dispatch(push("/"))}}
                    />
                    <p>aaa</p>
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenus handleDrawerToggle = {handleDrawerToggle}/>
                        </div>
                    )}

                </Toolbar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />
        </div>
    )


}

export default Header;