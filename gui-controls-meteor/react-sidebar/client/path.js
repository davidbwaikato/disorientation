import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Router } from "react-router-dom";

import Home from "../imports/ui/index.js";
import GeoTracker from "../imports/ui/geotracker.js";
import Images from "../imports/ui/carousel.js";
import Settings from "../imports/ui/settings.js";
import history from "./history"

class Path extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pullRight: false,
            touchHandleWidth: 20,
            checked1: false,
            checked2: false
        }
        
        this.handlePull = this.handlePull.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }
    
    handlePull(checked1) {
        this.setState({ checked1 });
        this.setState({ pullRight: !this.state.pullRight });
    }
    
    handleDrag(checked2) {
        this.setState({ checked2 });
        if(this.state.checked2 == false) { this.setState({ touchHandleWidth: 0 }); }
        else { this.setState({ touchHandleWidth: 20 }); }
    }
    
    render() {
        const pullRight = this.state.pullRight;
        const touchHandleWidth = this.state.touchHandleWidth;
        const checked1 = this.state.checked1;
        const checked2 = this.state.checked2;
        
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
                                onDragChange={this.handleDrag} />}
                        />
                        <Route 
                            exact path='/index' 
                            render={(props) => <Home {...props} 
                                pullRight={pullRight} 
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag} />}
                        />
                        <Route 
                            exact path='/geotracker' 
                            render={(props) => <GeoTracker {...props} 
                                pullRight={pullRight} 
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag} />}
                        />
                        <Route 
                            exact path='/images' 
                            render={(props) => <Images {...props} 
                                pullRight={pullRight} 
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag} />}
                        />
                        <Route 
                            exact path='/settings' 
                            render={(props) => <Settings {...props} 
                                pullRight={pullRight}
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag} />}
                        />
                    </Switch>
                </Router>
        )
    }
}

export default Path