import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Router, withRouter } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

import Home from "../imports/ui/index.js";
import GeoTracker from "../imports/ui/geotracker.js";
import Settings from "../imports/ui/settings.js";
import Images from "../imports/ui/carousel.js";
import history from "./history"

const browserHistory = createBrowserHistory();

class Path extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            toggle: JSON.parse(localStorage.getItem("toggle")),
        };
        
        this.handleToggle = this.handleToggle.bind(this);
    }
    
    handleToggle(openSecondary) {
        console.log(this.state.toggle);
        this.setState({ toggle: !this.state.toggle });
        console.log(this.state.toggle);
        localStorage.setItem("toggle", JSON.stringify(!this.state.toggle));
    }
    
    render() {
        const toggle = this.state.toggle;
        
        return(
            <Router history={history}>
                <Switch>
                    <Route 
                        exact path='/'
                        render={(props) => <Home {...props}
                            openSecondary={toggle}
                        />}
                    />
                    <Route 
                        exact path='/index'
                        render={(props) => <Home {...props}
                            openSecondary={toggle}
                        />}
                    />
                    <Route 
                        exact path='/geotracker'
                        render={(props) => <GeoTracker {...props}
                            openSecondary={toggle}
                        />}    
                    /> 
                    <Route 
                        exact path='/images'
                        render={(props) => <Images {...props}
                            openSecondary={toggle}
                        />}    
                    /> 
                    <Route 
                        exact path='/settings'
                        render={(props) => <Settings {...props}
                            openSecondary={toggle}
                            handleToggle={this.handleToggle}
                        />}
                    />
                </Switch>
            </Router>
        )
    }
    
}

export default Path;
