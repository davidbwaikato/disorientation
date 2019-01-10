import React, { Component } from "react";
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

import Navbar from "./appbar.js";
import Draw from "./drawer.js";

const styles = {
    content: {
        paddingTop: "64px"
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
            <div>
                <Navbar onClick={this.onClick} toggle={this.state.openSecondary} />
                <div style={styles.content}>
                    <Menu>
                        <Subheader>Settings</Subheader>
                        <MenuItem 
                            primaryText="Sidebar Anchored to Right" 
                            rightToggle={<Toggle 
                                onToggle={this.handleToggle}
                                toggled={this.state.openSecondary}
                            />} 
                        />
                    </Menu>
                    <Divider />
                    <Menu>
                        <MenuItem primaryText="Themes" />
                    </Menu>
                </div>
                <Draw handleClose={this.handleClose} open={this.state.open} openSecondary={this.state.openSecondary} />
            </div>
        );
    }
}

export default Settings