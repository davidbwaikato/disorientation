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

const styles = {
    content: {
        paddingTop: "72px",
    },
    root: { 
        position: "absolute", 
        top: "0", 
        bottom: "0",
        left: "0",
        right: "0",
    }
};

class Settings extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            open: false,
            openSecondary: this.props.openSecondary
        };
        
        this.onClick = this.onClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }
    
    onClick(e) {
        this.setState({ open: !this.state.open });
    }
    
    handleClose(e) {
        this.setState({ open: false });
    }
    
    handleToggle(e) {
        this.setState({ openSecondary: !this.state.openSecondary});
        this.props.handleToggle(this.state.openSecondary);
    }
    
    render() {
        
        return(
            <Paper style={styles.root}>
                <Navbar onClick={this.onClick} toggle={this.state.openSecondary} />
                <div style={styles.content}>
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
                    handleClose={this.handleClose} 
                    open={this.state.open} 
                    openSecondary={this.state.openSecondary}
                    theme={this.props.theme}
                />
            </Paper>
        );
    }
}

export default Settings