import React from 'react';
import { Route, Switch } from "react-router";
import { Home, SignUp, SignIn, Auth, Reset, ProductEdit} from "./templates";

const Router = () => {
    return (
        <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signin/reset" component={Reset} />
            
            

            <Auth>
                <Route exact path="(/)?" component={Home} />
                <Route exact path="/product/edit" component={ProductEdit} />
            </Auth>
        </Switch>
    )
}

export default Router;