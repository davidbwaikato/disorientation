import React, { Component } from "react";
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Done from 'material-ui/svg-icons/action/done';
import { grey100 } from 'material-ui/styles/colors';

import Navbar from "./appbar.js";
import Settings from "./settings.js";
import history from "../../client/history.js";
import "./appbar.css";

const styles = {
    content: {
        paddingTop: "72px",
    },
    radio: {
        padding: "16px"
    },
    button: {
        paddingBottom: "12px",
    }
};

function Empty(props) {
    return(
        <div></div>
    );
}

class SettingsTheme extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            setting: true,
        }
        
        this.onClick = this.onClick.bind(this)
        this.myRef = React.createRef();
    }
    
    onClick(e) {
        console.log(e.target.value);
        this.props.onClick(e.target.value);
    }
    
    render() {
        return(
            <Paper className="root">
                <Navbar onClick={() => history.push("/settings")} setting={this.state.setting} />
                <div style={styles.content}>
                    <Subheader>Themes</Subheader>
                    <RadioButtonGroup name="theme" labelPosition="left" style={styles.radio} defaultSelected={this.props.theme}>
                        <RadioButton
                                label="Red Theme"
                                value="redMuiTheme"
                                onClick={this.onClick}
                                checkedIcon={<Done />}
                                uncheckedIcon={<Empty />}
                                style={styles.button}
                        />
                        <RadioButton
                                label="Orange Theme"
                                value="orangeMuiTheme"
                                onClick={this.onClick}
                                checkedIcon={<Done />}
                                uncheckedIcon={<Empty />}
                                style={styles.button}
                        />
                        <RadioButton
                                label="Dark Theme"
                                value="darkMuiTheme"
                                onClick={this.onClick}
                                checkedIcon={<Done />}
                                uncheckedIcon={<Empty />}
                                style={styles.button}
                        />
                    </RadioButtonGroup>
                </div>
            </Paper>
        )
    }
}

export default SettingsTheme;