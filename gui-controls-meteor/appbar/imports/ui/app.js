import React, { Component } from "react"
import CssBaseline from '@material-ui/core/CssBaseline';

import Path from "../../client/path.js";
import Login from "./login.js";
import { redMuiTheme } from "./themes.js";

class App extends Component {
    render() {
        if(Meteor.appstate.toggle == null) {
            Meteor.appstate.toggle = false;
            Meteor.appstate.muiThemeS = "redMuiTheme";
            Meteor.appstate.muiTheme = redMuiTheme;
        }
        if(Meteor.appstate.auth == false || Meteor.appstate.auth == null) {
            return (
                <Login />
            )
        } else if(Meteor.appstate.auth == true) {
            return (
                <Path />
            )
        }
    }
}

export default App