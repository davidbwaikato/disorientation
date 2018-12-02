import React from 'react'
import { Switch, Route, Router } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

import App from "../imports/ui/index.js";
import GeoTracker from "../imports/ui/geotracker.js";
import Images from "../imports/ui/carousel.js";
import Settings from "../imports/ui/settings.js";

const browserHistory = createBrowserHistory();

const Path = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route exact path='/index' component={App}/>
            <Route exact path='/geotracker' component={GeoTracker}/>
            <Route exact path='/images' component={Images}/>
            <Route exact path='/settings' component={Settings}/>
        </Switch>
    </Router>
)

export default Path;