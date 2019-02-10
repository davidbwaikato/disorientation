import React, { Component } from "react"

import Login from "../imports/ui/login.js"
import Path from "./path.js"

class App extends Component {
    constructor(props) {
        super(props);
        var defaults = [
            ["SDBR_pullRight", "false"],
            ["SDBR_touchHandleWidth", "20"],
            ["OPTN_dockRight", JSON.stringify(false)],
            ["OPTN_dragEnabled", JSON.stringify(false)]
        ];
        for (var appstate in defaults) {
            Meteor.appstate.setDefault(appstate[0], appstate[1]);
        }
        if (JSON.parse(localStorage.getItem("auth")) == false || JSON.parse(localStorage.getItem("auth")) == null) {
            return (
                <Login />
            )
        } else if (JSON.parse(localStorage.getItem("auth")) == true) {
            return (
                <Path />
            )
        }
       
    }
    render() {

        
       
    }
}

export default App