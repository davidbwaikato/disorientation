import React, { Component } from "react"

import Path from "../../client/path.js";
import { redMuiTheme } from "./themes.js";

class App extends Component {
    render() {
        if(localStorage.getItem("toggle") == null) {
            localStorage.setItem("toggle", "false");
            localStorage.setItem("muiThemeS", "redMuiTheme");
            localStorage.setItem("muiTheme", JSON.stringify(redMuiTheme));
        }
        return(
            <React.Fragment>
                <Path /> 
            </React.Fragment>
        )
    }
}

export default App