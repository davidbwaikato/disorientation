import React, { Component } from "react";
import Switch from "react-switch";

import Sidebar from "./sidebar";
import Panel from "./panel";
import SidebarContent from "./sidebar_content";

const styles = {
    contentHeaderMenuLink: {
        backgroundColor: "transparent",
        background: "transparent",
        textDecoration: "none",
        color: "white",
        padding: 8
    },
    content: {
        padding: "16px"
    },
    switch: {
        padding: "0",
    },
    divider: {
        margin: "16px 0",
        height: 1,
        backgroundColor: "#e0e0e0"
    },
    block: {
        display: "block",
        padding: "12px 12px",
        color: "#000000",
        textDecoration: "none",
        //fontWeight: "bold"
    }
};

class Settings extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            checked1: false,
            checked2: false,
            
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            pullRight: false,
            touchHandleWidth: 20,
            dragToggleDistance: 50
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
        this.menuButtonClick = this.menuButtonClick.bind(this);
    }
    
    handleChange(checked1) {
        this.setState({ checked1 });
        this.setState({ pullRight: !this.state.pullRight });
    }
    
    handleDrag(checked2) {
        this.setState({ checked2 });
        if(this.state.checked2 == false) { this.setState({ touchHandleWidth: 0 }); }
        else { this.setState({ touchHandleWidth: 20 }); }
    }
    
    onSetOpen(open) {
        this.setState({ open })
    }
    
    menuButtonClick(ev) {
        ev.preventDefault();
        this.onSetOpen(!this.state.open);
    }
    
    render() {
        const sidebar = <SidebarContent />;

        const contentHeader = (
            <span>
                <a
                    onClick={this.menuButtonClick}
                    href="#"
                    style={styles.contentHeaderMenuLink}
                >
                    ☰
                </a>
                <span></span>
            </span>
        );
        
        const sidebarProps = {
            sidebar,
            docked: this.state.docked,
            sidebarClassName: "custom-sidebar-class",
            contentId: "custom-sidebar-content-id",
            open: this.state.open,
            touch: this.state.touch,
            shadow: this.state.shadow,
            pullRight: this.state.pullRight,
            touchHandleWidth: this.state.touchHandleWidth,
            dragToggleDistance: this.state.dragToggleDistance,
            transitions: this.state.transitions,
            onSetOpen: this.onSetOpen
        };
        
        return(
            <Sidebar {...sidebarProps}>
                <Panel title={contentHeader}>
                    <div style={styles.content}>
                        <label style={styles.block}>
                            <span>Change sidebar anchor to right</span>
                            <Switch
                                onChange={this.handleChange}
                                checked={this.state.checked1}
                                style={styles.switch}
                                onColor="#2693e6"
                                onHandleColor="#FFF"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                handleDiameter={14}
                                height={22}
                                width={48}
                                id="right"
                            />
                        </label>
                        <div style={styles.divider} />
                        <label style={styles.block}>
                            <span>Disable drag to open sidebar</span>
                            <Switch
                                onChange={this.handleDrag}
                                checked={this.state.checked2}
                                style={styles.switch}
                                onColor="#2693e6"
                                onHandleColor="#FFF"
                                uncheckedIcon={false}
                                checkedIcon={false}
                                handleDiameter={14}
                                height={22}
                                width={48}
                                id="drag"
                            />
                        </label>
                        <div style={styles.divider} />
                    </div>
                </Panel>
            </Sidebar>
        );
    }
}

export default Settings