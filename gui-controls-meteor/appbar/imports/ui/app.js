import React, { Component } from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Home from "./index.js";
import Path from "../../client/path.js";
import { redMuiTheme, darkMuiTheme } from "./themes.js";

class App extends Component {
    render() {
        if(localStorage.getItem("toggle") == null) {
            localStorage.setItem("toggle", "false");
        }
        return(
            <MuiThemeProvider muiTheme={getMuiTheme(redMuiTheme)}>
                <Path /> 
            </MuiThemeProvider>
        )
    }
}

export default App