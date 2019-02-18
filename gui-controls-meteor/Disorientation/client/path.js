import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Router, withRouter } from "react-router-dom";

import Home from "../imports/ui/index.js";
import VPlayer from "../imports/ui/video.js";
import GeoTracker from "../imports/ui/geotracker.js";
import Settings from "../imports/ui/settings.js";
import Images from "../imports/ui/carousel.js";
import SettingsTheme from "../imports/ui/settingsTheme.js";
import Login from "../imports/ui/login.js";
import Maps from "../imports/ui/map.js";
import Heatmap from '../imports/ui/heatmap.js';
import Map3D from '../imports/ui/map3d.js';
import history from "./history";

class Path extends Component { 
    render() {       
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/index' component={Home}/>
                    <Route exact path='/geotracker' component={GeoTracker}/> 
                    <Route exact path='/images' component={Images} /> 
                    <Route exact path='/video' component={VPlayer} />  
                    <Route exact path='/map' component={Maps} />
                    <Route exact path='/heatmap' component={Heatmap} />
                    <Route exact path='/map3d' component={Map3D} />
                    <Route
                        exact path='/settings'
                        render={(props) => <Settings {...props}
                            handleToggle={this.props.handleToggle}
                        />}
                    />
                    <Route
                        exact path='/settings/theme'
                        render={(props) => <SettingsTheme {...props}
                            onClick={this.props.handleTheme}
                            theme={this.props.theme}
                        />}
                    />
                </Switch>
            </Router>
        )
    }

}

export default Path;
