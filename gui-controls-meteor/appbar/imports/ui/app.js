import React, { Component } from "react"
import CssBaseline from '@material-ui/core/CssBaseline';

import Path from "../../client/path.js";
import Login from "./login.js";
import { redMuiTheme } from "./themes.js";

class App extends Component {
    render() {
        if(localStorage.getItem("toggle") == null) {
            localStorage.setItem("toggle", "false");
            localStorage.setItem("muiThemeS", "redMuiTheme");
            localStorage.setItem("muiTheme", JSON.stringify(redMuiTheme));
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