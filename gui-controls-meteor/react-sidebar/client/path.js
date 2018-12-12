import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Router } from "react-router-dom";

import Home from "../imports/ui/index.js";
import GeoTracker from "../imports/ui/geotracker.js";
import Images from "../imports/ui/carousel.js";
import Settings from "../imports/ui/settings.js";
import history from "./history";
import Heightmap from "../imports/demo_modules/demo_graphics.js";
import GMap from "../imports/demo_modules/demo_maps.js";

class Path extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pullRight: JSON.parse(localStorage.getItem("pullRight")),
            touchHandleWidth: JSON.parse(
                localStorage.getItem("touchHandleWidth")
            ),
            checked1: JSON.parse(localStorage.getItem("checked1")),
            checked2: JSON.parse(localStorage.getItem("checked2"))
        };

        this.handlePull = this.handlePull.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handlePull(checked1) {
        this.setState({ checked1 });
        localStorage.setItem("checked1", JSON.stringify(checked1));
        this.setState({ pullRight: !this.state.pullRight });
        localStorage.setItem(
            "pullRight",
            JSON.stringify(!this.state.pullRight)
        );
    }

    handleDrag(checked2) {
        this.setState({ checked2 });
        localStorage.setItem("checked2", JSON.stringify(checked2));
        if (this.state.checked2 == false) {
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

        return (
            <Router history={history}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <Home
                                {...props}
                                pullRight={pullRight}
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/index"
                        render={props => (
                            <Home
                                {...props}
                                pullRight={pullRight}
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/geotracker"
                        render={props => (
                            <GeoTracker
                                {...props}
                                pullRight={pullRight}
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/images"
                        render={props => (
                            <Images
                                {...props}
                                pullRight={pullRight}
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/settings"
                        render={props => (
                            <Settings
                                {...props}
                                pullRight={pullRight}
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/demo_graphics"
                        render={props => (
                            <Heightmap
                                {...props}
                                pullRight={pullRight}
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/demo_maps"
                        render={props => (
                            <GMap
                                {...props}
                                pullRight={pullRight}
                                touchHandleWidth={touchHandleWidth}
                                checked1={checked1}
                                checked2={checked2}
                                onPullChange={this.handlePull}
                                onDragChange={this.handleDrag}
                            />
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

export default Path;
