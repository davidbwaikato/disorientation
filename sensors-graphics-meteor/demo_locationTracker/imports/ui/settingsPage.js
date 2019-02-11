import React, { Component } from "react";

import "./settings.css";
import Panel from "./panel";
import history from "../../client/history"

const styles = {
    contentHeaderMenuLink: {
        textDecoration: "none",
        color: "white",
        textAlign: "right"
    },
    content: {
        padding: "4px 0"
    },
    divider: {
        margin: "0 16px",
        height: 1,
        backgroundColor: "#e0e0e0"
    },
    blockTop: {
        display: "block",
        padding: "24px 16px",
        paddingTop: "28px",
        color: "#000000",
        textDecoration: "none",
        fontWeight: "normal"
    },
    block: {
        display: "block",
        padding: "24px 16px",
        color: "#000000",
        textDecoration: "none",
        fontWeight: "normal"
    },
    radio: {
        marginRight: "6px"
    }
};

class SettingsPage extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            checked: "panelW",
        }
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.onBGChange(e);
    }
    
    render() {
        const className = this.props.checked;
        
        const contentHeader = (
            <span>
                <a
                    onClick={() => history.push("/settings")}
                    style={styles.contentHeaderMenuLink}
                >
                    <i className="fa fa-arrow-left"></i>
                </a>
                <span></span>
            </span>
        );

        return (
            <Panel title={contentHeader}>
                <body style={{ height: window.innerHeight }} className={className}>
                    <div style={styles.content}>
                        <label style={styles.blockTop}>
                            <input 
                                type="radio" 
                                value="panelW" 
                                checked={this.props.checked === "panelW"}
                                onChange={this.handleChange}
                                style={styles.radio}
                            /> 
                            White
                        </label>
                        <div style={styles.divider}/>
                        <label style={styles.block}>
                            <input 
                                type="radio" 
                                value="panelG" 
                                checked={this.props.checked === "panelG"}
                                onChange={this.handleChange}
                                style={styles.radio}
                            /> 
                            Gray
                        </label>
                        <div style={styles.divider}/>
                        <label style={styles.block}>
                            <input 
                                type="radio" 
                                value="panelY" 
                                checked={this.props.checked === "panelY"}
                                onChange={this.handleChange}
                                style={styles.radio}
                            /> 
                            Yellow
                        </label>
                        <div style={styles.divider}/>
                        <label style={styles.block}>
                            <input 
                                type="radio" 
                                value="panelB" 
                                checked={this.props.checked === "panelB"}
                                onChange={this.handleChange}
                                style={styles.radio}
                            /> 
                            Blue
                        </label>
                        <div style={styles.divider}/>
                        <label style={styles.block}>
                            <input 
                                type="radio" 
                                value="panelO" 
                                checked={this.props.checked === "panelO"}
                                onChange={this.handleChange}
                                style={styles.radio}
                            /> 
                            Orange
                        </label>
                        <div style={styles.divider}/>
                    </div>
                </body>
            </Panel>
        )
    }
}

export default SettingsPage