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
    block: {
        display: "block",
        padding: "24px 16px",
        color: "#000000",
        textDecoration: "none",
        fontWeight: "normal"
    }
};

class settingsPage extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            checked: "panelW",
        }
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.setState ({ checked: e.target.value });
    }
    
    render() {
        const className = this.state.checked;
        
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
                <div style={styles.content} className={className}>
                    <label style={styles.block}>
                        <input 
                            type="radio" 
                            value="panelW" 
                            checked={this.state.checked === "panelW"}
                            onChange={this.handleChange}
                        /> 
                        White
                    </label>
                    <div style={styles.divider}/>
                    <label style={styles.block}>
                        <input 
                            type="radio" 
                            value="panelG" 
                            checked={this.state.checked === "panelG"}
                            onChange={this.handleChange}
                        /> 
                        Gray
                    </label>
                    <div style={styles.divider}/>
                    <label style={styles.block}>
                        <input 
                            type="radio" 
                            value="panelY" 
                            checked={this.state.checked === "panelY"}
                            onChange={this.handleChange}
                        /> 
                        Yellow
                    </label>
                    <div style={styles.divider}/>
                    <label style={styles.block}>
                        <input 
                            type="radio" 
                            value="panelB" 
                            checked={this.state.checked === "panelB"}
                            onChange={this.handleChange}
                        /> 
                        Blue
                    </label>
                    <div style={styles.divider}/>
                    <label style={styles.block}>
                        <input 
                            type="radio" 
                            value="panelO" 
                            checked={this.state.checked === "panelO"}
                            onChange={this.handleChange}
                        /> 
                        Orange
                    </label>
                    <div style={styles.divider}/>
                </div>
            </Panel>
        )
    }
}

export default settingsPage