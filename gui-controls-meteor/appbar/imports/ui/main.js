import React, { Component } from "react"
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { redMuiTheme } from "./themes.js";

import App from "./app.js";
import Login from "./login.js";

class Main extends Component {
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
                <App />
            )
        }
    }
}

export default Main