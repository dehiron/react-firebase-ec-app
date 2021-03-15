import React from 'react';
import { Route, Switch } from "react-router";
import { Home, SignUp, SignIn, Auth } from "./templates";

const Router = () => {
    return (
        <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />

            <Auth>
                <Route exact path="(/)?" component={Home} />
            </Auth>
        </Switch>
    )
}

export default Router;