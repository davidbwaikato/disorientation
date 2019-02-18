import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Router, withRouter } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Home from "../imports/ui/index.js";
import VPlayer from "../imports/ui/video.js";
import GeoTracker from "../imports/ui/geotracker.js";
import Settings from "../imports/ui/settings.js";
import Images from "../imports/ui/carousel.js";
import SettingsTheme from "../imports/ui/settingsTheme.js";
import Login from "../imports/ui/login.js";
import Maps from "../imports/ui/map.js";
import { redMuiTheme, darkMuiTheme, orangeMuiTheme } from "../imports/ui/themes.js";
import history from "./history";
import Heatmap from '../imports/ui/heatmap.js';

class Path extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route
                        exact path='/'
                        render={(props) => <Home {...props}
                        />}
                    />
                    <Route
                        exact path='/index'
                        render={(props) => <Home {...props}
                        />}
                    />
                    <Route
                        exact path='/geotracker'
                        render={(props) => <GeoTracker {...props}
                        />}
                    />
                    <Route
                        exact path='/images'
                        render={(props) => <Images {...props}
                        />}
                    />
                    <Route
                        exact path='/video'
                        render={(props) => <VPlayer {...props}

                        />}
                    />
                    <Route
                        exact path='/map'
                        render={(props) => <Maps {...props}
                        />}
                    />
                    <Route
                        exact path='/heatmap'
                        render={(props) => <Heatmap {...props}

                        />}
                    />
                    <Route
                        exact path='/settings'
                        render={(props) => <Settings {...props}
                            handleToggle={this.props.handleToggle}
                            handleToggle2={this.props.handleToggle2}
                        />}
                    />
                    <Route
                        exact path='/settings/theme'
                        render={(props) => <SettingsTheme {...props}
                            onClick={this.props.handleTheme}
                            theme={this.props.theme}
                        />}
                    />
                    <Route
                        exact path='/login'
                        render={(props) => <Login {...props}
                        />}
                    />
                </Switch>
            </Router>
        )
    }

}

export default Path;
