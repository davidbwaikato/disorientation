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

class Path extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            toggle: Meteor.appstate.toggle,
            muiTheme: Meteor.appstate.muiTheme,
            muiThemeS: Meteor.appstate.muiThemeS,
        };
        
        this.handleToggle = this.handleToggle.bind(this);
        this.handleTheme = this.handleTheme.bind(this);
    }
    
    handleToggle(openSecondary) {
        this.setState({ toggle: !this.state.toggle });
        Meteor.appstate.toggle = !this.state.toggle;
    }
    
    handleTheme(e) {
        switch(e) {
            case "redMuiTheme":
                this.setState({ muiThemeS: e });
                Meteor.appstate.muiThemeS = "redMuiTheme";
                this.setState({ muiTheme: redMuiTheme });
                Meteor.appstate.muiTheme = redMuiTheme;
                break;
            case "orangeMuiTheme":
                this.setState({ muiThemeS: e });
                Meteor.appstate.muiThemeS = "orangeMuiTheme";
                this.setState({ muiTheme: orangeMuiTheme });
                Meteor.appstate.muiTheme = orangeMuiTheme;
                break;
            case "darkMuiTheme":
                this.setState({ muiThemeS: e });
                Meteor.appstate.muiThemeS = "darkMuiTheme";
                this.setState({ muiTheme: darkMuiTheme });
                Meteor.appstate.muiTheme = darkMuiTheme;
                break;
        }
    }
    
    render() {
        const toggle = this.state.toggle;
        
        return(
            <MuiThemeProvider muiTheme={getMuiTheme(this.state.muiTheme)}>
                <Router history={history}>
                    <Switch>
                        <Route 
                            exact path='/'
                            render={(props) => <Home {...props}
                                openSecondary={toggle}
                                theme={this.state.muiThemeS}
                            />}
                        />
                        <Route 
                            exact path='/index'
                            render={(props) => <Home {...props}
                                openSecondary={toggle}
                                theme={this.state.muiThemeS}
                            />}
                        />
                        <Route 
                            exact path='/geotracker'
                            render={(props) => <GeoTracker {...props}
                                openSecondary={toggle}
                                theme={this.state.muiThemeS}
                            />}    
                        /> 
                        <Route 
                            exact path='/images'
                            render={(props) => <Images {...props}
                                openSecondary={toggle}
                                theme={this.state.muiThemeS}
                            />}    
                        /> 
                        <Route 
                            exact path='/video'
                            render={(props) => <VPlayer {...props}
                                openSecondary={toggle}
                                theme={this.state.muiThemeS}
                            />}    
                        />  
                        <Route 
                            exact path='/map'
                            render={(props) => <Maps {...props}
                                openSecondary={toggle}
                                theme={this.state.muiThemeS}
                            />}    
                        />
                        <Route 
                            exact path='/settings'
                            render={(props) => <Settings {...props}
                                openSecondary={toggle}
                                handleToggle={this.handleToggle}
                                theme={this.state.muiThemeS}
                            />}
                        />
                        <Route 
                            exact path='/settings/theme'
                            render={(props) => <SettingsTheme {...props}
                                openSecondary={toggle}
                                handleToggle={this.handleToggle}
                                onClick={this.handleTheme}
                                theme={this.state.muiThemeS}
                            />}
                        />
                        <Route 
                            exact path='/login'
                            render={(props) => <Login {...props}
                                theme={this.state.muiThemeS}
                            />}
                        />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        )
    }
    
}

export default Path;
