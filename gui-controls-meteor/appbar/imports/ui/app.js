import React, { Component } from "react"
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Path from "../../client/path.js";
import Login from "./login.js";
import Navbar from "./appbar.js";
import Draw from "./drawer.js"; 
import { redMuiTheme, darkMuiTheme, orangeMuiTheme } from "./themes.js";
import Main from "./main.js";

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            left: false,
            right: false,
            toggle: Meteor.appstate.toggle,
            muiTheme: Meteor.appstate.muiTheme,
            muiThemeS: Meteor.appstate.muiThemeS,
        };
        
        this.onToggle = this.onToggle.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleTheme = this.handleTheme.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }
    
    onLogin(e) {
        Meteor.appstate.auth = false;
    }
    
    onToggle = (side, open) => () => {
        this.setState({ [side]: open });
    }
    
    handleToggle(openSecondary) {
        this.setState({ toggle: !this.state.toggle });
        Meteor.appstate.toggle = !this.state.toggle;
    }
    
    handleTheme(e) {
        switch(e) {
            case "redMuiTheme":
                this.setState({ muiThemeS: e });
                Meteor.appstate.muiThemeS = "redMuiTheme";
                this.setState({ muiTheme: redMuiTheme });
                Meteor.appstate.muiTheme = redMuiTheme;
                break;
            case "orangeMuiTheme":
                this.setState({ muiThemeS: e });
                Meteor.appstate.muiThemeS = "orangeMuiTheme";
                this.setState({ muiTheme: orangeMuiTheme });
                Meteor.appstate.muiTheme = orangeMuiTheme;
                break;
            case "darkMuiTheme":
                this.setState({ muiThemeS: e });
                Meteor.appstate.muiThemeS = "darkMuiTheme";
                this.setState({ muiTheme: darkMuiTheme });
                Meteor.appstate.muiTheme = darkMuiTheme;
                break;
        }
    }
    
    render() {
        const toggle = this.state.toggle;
        
        if(Meteor.appstate.auth == true) {
            return (
                <MuiThemeProvider muiTheme={getMuiTheme(this.state.muiTheme)}>
                    <div>
                        <Navbar onClick={this.onToggle} toggle={this.state.toggle} />
                        <Path handleToggle={this.handleToggle} handleTheme={this.handleTheme} theme={this.state.muiThemeS} />
                        <Draw 
                            toggleDrawer={this.onToggle} 
                            left={this.state.left}
                            right={this.state.right}
                            theme={this.state.muiThemeS}
                            toggle={this.state.toggle}
                            onLogin={this.onLogin}
                        />
                    </div>
                </MuiThemeProvider>
            )
        } else {
            return(
                <Login />
            )
        }
        
    }
}

export default App