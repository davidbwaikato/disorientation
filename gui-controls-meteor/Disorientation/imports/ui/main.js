import React, { Component } from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { redMuiTheme } from "./themes.js";

import App from "./app.js";
import Login from "./login.js";

class Main extends Component {
    render() {       
        if(Meteor.appstate.toggle == null) {
            Meteor.appstate.toggle = false;
        }
        if(Meteor.appstate.muiTheme == null) {
            Meteor.appstate.muiThemeS = "redMuiTheme";
            Meteor.appstate.muiTheme = redMuiTheme;
        }
        
        return (
            <App />
        )
    }
}

export default Main