import React, { Component } from "react"

import Login from "../imports/ui/login.js"
import Path from "./path.js"

class App extends Component {
    render() {
        if(localStorage.getItem("pullRight") == null) {
            localStorage.setItem("pullRight", "false");
            localStorage.setItem("touchHandleWidth", "20");
            localStorage.setItem("checked1", JSON.stringify(false));
            localStorage.setItem("checked2", JSON.stringify(false));
            localStorage.setItem("bg", JSON.stringify("panelW"));
        }
        if(JSON.parse(localStorage.getItem("auth")) == false || JSON.parse(localStorage.getItem("auth")) == null) {
            return (
                <Login />
            )
        } else if(JSON.parse(localStorage.getItem("auth")) == true) {
            return (
                <Path />
            )
        }
    }
}

export default App