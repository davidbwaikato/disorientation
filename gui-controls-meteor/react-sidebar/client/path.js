import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Router, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "../imports/ui/index.js";
import GeoTracker from "../imports/ui/geotracker.js";
import Images from "../imports/ui/carousel.js";
import Settings from "../imports/ui/settings.js";
import settingsPage from "../imports/ui/settingsPage.js";
import Login from "../imports/ui/login.js";
import history from "./history"
    
class Path extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pullRight: JSON.parse(localStorage.getItem("pullRight")),
            touchHandleWidth: JSON.parse(localStorage.getItem("touchHandleWidth")),
            checked1: JSON.parse(localStorage.getItem("checked1")),
            checked2: JSON.parse(localStorage.getItem("checked2")),
            grow1: JSON.parse(localStorage.getItem("grow1")),
            grow2: JSON.parse(localStorage.getItem("grow2"))
        }
        this.handlePull = this.handlePull.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        console.log(JSON.parse(localStorage.getItem("auth")));
    }
    
    handlePull(checked1) {
        this.setState({ checked1 });
        localStorage.setItem("checked1", JSON.stringify(checked1));
        this.setState({ pullRight: !this.state.pullRight });
        localStorage.setItem("pullRight", JSON.stringify(!this.state.pullRight));
        if(this.state.checked1 == false) { 
            this.setState({ grow1: 20 }); 
            localStorage.setItem("grow1", JSON.stringify(20));
            this.setState({ grow2: 0 }); 
            localStorage.setItem("grow2", JSON.stringify(0));
        } else { 
            this.setState({ grow1: 0 }); 
            localStorage.setItem("grow1", JSON.stringify(0));
            this.setState({ grow2: 20 });
            localStorage.setItem("grow2", JSON.stringify(20));
        }
    }
    
    handleDrag(checked2) {
        this.setState({ checked2 });
        localStorage.setItem("checked2", JSON.stringify(checked2));
        if(this.state.checked2 == false) { 
            this.setState({ touchHandleWidth: 0 }); 
            localStorage.setItem("touchHandleWidth", "0");
        } else { 
            this.setState({ touchHandleWidth: 20 }); 
            localStorage.setItem("touchHandleWidth", "20");
        }
    }
    
    render() {
        const pullRight = this.state.pullRight;
        const touchHandleWidth = this.state.touchHandleWidth;
        const checked1 = this.state.checked1;
        const checked2 = this.state.checked2;
        const grow1 = this.state.grow1;
        const grow2 = this.state.grow2;
        
        return (
            <Router history={history}>
                <Switch>
                    <Route 
                        exact path='/'
                        render={(props) => <Home {...props} 
                            pullRight={pullRight} 
                            touchHandleWidth={touchHandleWidth}
                            checked1={checked1}
                            checked2={checked2}
                            onPullChange={this.handlePull}
                            onDragChange={this.handleDrag}
                            growStart={grow1}
                            growEnd={grow2} />}
                    />
                    <Route 
                        exact path='/index' 
                        render={(props) => <Home {...props} 
                            pullRight={pullRight} 
                            touchHandleWidth={touchHandleWidth}
                            checked1={checked1}
                            checked2={checked2}
                            onPullChange={this.handlePull}
                            onDragChange={this.handleDrag}
                            growStart={grow1}
                            growEnd={grow2} />}
                    />
                    <Route 
                        exact path='/geotracker' 
                        render={(props) => <GeoTracker {...props} 
                            pullRight={pullRight} 
                            touchHandleWidth={touchHandleWidth}
                            checked1={checked1}
                            checked2={checked2}
                            onPullChange={this.handlePull}
                            onDragChange={this.handleDrag}
                            growStart={grow1}
                            growEnd={grow2} />}
                    />
                    <Route 
                        exact path='/images' 
                        render={(props) => <Images {...props} 
                            pullRight={pullRight} 
                            touchHandleWidth={touchHandleWidth}
                            checked1={checked1}
                            checked2={checked2}
                            onPullChange={this.handlePull}
                            onDragChange={this.handleDrag}
                            growStart={grow1}
                            growEnd={grow2} />}
                    />
                    <Route 
                        exact path='/settings' 
                        render={(props) => <Settings {...props} 
                            pullRight={pullRight}
                            touchHandleWidth={touchHandleWidth}
                            checked1={checked1}
                            checked2={checked2}
                            onPullChange={this.handlePull}
                            onDragChange={this.handleDrag}
                            growStart={grow1}
                            growEnd={grow2} />}
                    />
                    <Route exact path='/settings/page' component={settingsPage} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </Router>
        )
    }
}

export default Path