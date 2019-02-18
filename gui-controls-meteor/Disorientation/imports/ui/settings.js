import React, { Component } from "react";
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

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

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(e) {
        this.setState({ openSecondary: !this.state.openSecondary});
        this.props.handleToggle(this.state.openSecondary);
    }
    
    render() {
        
        return(
            <Paper className="root">
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
            </Paper>
        );
    }
}

export default Settings