import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Router, withRouter } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Home from "../imports/ui/index.js";
import Player from "../imports/ui/video.js";
import GeoTracker from "../imports/ui/geotracker.js";
import Settings from "../imports/ui/settings.js";
import Images from "../imports/ui/carousel.js";
import SettingsTheme from "../imports/ui/settingsTheme.js";
import Login from "../imports/ui/login.js";
import { redMuiTheme, darkMuiTheme, orangeMuiTheme } from "../imports/ui/themes.js";
import history from "./history";

class Path extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            toggle: JSON.parse(localStorage.getItem("toggle")),
            muiTheme: JSON.parse(localStorage.getItem("muiTheme")),
            muiThemeS: localStorage.getItem("muiThemeS"),
        };
        
        this.handleToggle = this.handleToggle.bind(this);
        this.handleTheme = this.handleTheme.bind(this);
    }
    
    handleToggle(openSecondary) {
        this.setState({ toggle: !this.state.toggle });
        localStorage.setItem("toggle", JSON.stringify(!this.state.toggle));
    }
    
    handleTheme(e) {
        if(e == "redMuiTheme") {
            this.setState({ muiThemeS: e });
            localStorage.setItem("muiThemeS", "redMuiTheme");
            this.setState({ muiTheme: redMuiTheme });
            localStorage.setItem("muiTheme", JSON.stringify(redMuiTheme));
        } else if(e == "orangeMuiTheme") {
            this.setState({ muiThemeS: e });
            localStorage.setItem("muiThemeS", "orangeMuiTheme");
            this.setState({ muiTheme: orangeMuiTheme });
            localStorage.setItem("muiTheme", JSON.stringify(orangeMuiTheme));
        } else if(e == "darkMuiTheme") {
            this.setState({ muiThemeS: e });
            localStorage.setItem("muiThemeS", "darkMuiTheme");
            this.setState({ muiTheme: darkMuiTheme });
            localStorage.setItem("muiTheme", JSON.stringify(darkMuiTheme));
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
                            render={(props) => <Player {...props}
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
