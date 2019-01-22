import React, { Component } from "react";
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

import Navbar from "./appbar.js";
import Draw from "./drawer.js";
import history from "../../client/history.js";
import "./appbar.css";

class Settings extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            left: false,
            right: false,
            openSecondary: this.props.openSecondary
        };
        
        this.onClick = this.onClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }
    
    onClick = (side, open) => () => {
        this.setState({ [side]: open });
    }
    
    handleToggle(e) {
        this.setState({ openSecondary: !this.state.openSecondary});
        this.props.handleToggle(this.state.openSecondary);
    }
    
    render() {
        
        return(
            <Paper className="rootFull">
                <Navbar onClick={this.onClick} toggle={this.state.openSecondary} />
                <div style={{ paddingTop: 72 }}>
                    <List>
                        <Subheader>Settings</Subheader>
                        <ListItem 
                            primaryText="Sidebar Anchored to Right" 
                            rightToggle={<Toggle 
                                onToggle={this.handleToggle}
                                toggled={this.state.openSecondary}
                            />} 
                        />
                    </List>
                    <Divider />
                    <List>
                        <ListItem primaryText="Themes" onClick={() => history.push("/settings/theme")} />
                    </List>
                </div>
                <Draw 
                    toggleDrawer={this.onClick} 
                    left={this.state.left}
                    right={this.state.right}
                    theme={this.props.theme}
                    toggle={this.state.openSecondary}
                />
            </Paper>
        );
    }
}

export default Settings