import React, { Component } from "react";
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
            allowTracking: Meteor.appstate.allowtracking,
            openSecondary: this.props.openSecondary
        };
    
        this.onClick = this.onClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleToggle2 = this.handleToggle2.bind(this);
    }

    onClick = (side, open) => () => {
        this.setState({ [side]: open });
    }

    handleToggle(e) {
        this.setState({ openSecondary: !this.state.openSecondary });
        this.props.handleToggle(this.state.openSecondary);
    }
    handleToggle2(e) {
        this.setState({ allowTracking: !this.state.allowTracking });
      //  this.props.handleToggle2(this.state.allowTracking);
      Meteor.appstate.allowtracking = this.state.allowTracking;
   
    }

    render() {

        return (
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
                        <ListItem
                            primaryText="Allow Tracking"
                            rightToggle={<Toggle
                                onToggle={this.handleToggle2}
                                toggled={this.state.allowTracking}
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