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
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            dragToggleDistance: 50
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
        this.menuButtonClick = this.menuButtonClick.bind(this);
    }
    
    handleChange(checked1) {
        this.props.onPullChange(checked1);
    }
    
    handleDrag(checked2) {
        this.props.onDragChange(checked2);
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
            pullRight: this.props.pullRight,
            touchHandleWidth: this.props.touchHandleWidth,
            dragToggleDistance: this.state.dragToggleDistance,
            transitions: this.state.transitions,
            onSetOpen: this.onSetOpen
        };
        
        return(
            <Sidebar {...sidebarProps}>
                <Panel title={contentHeader}>
                    <div style={styles.content}>
                        <label style={styles.block}>
                            <Row justifyContent="space-between">
                                <Column flexGrow={4}>
                                    <span>Change sidebar anchor to right</span>
                                </Column>
                                <Column flexGrow={1}>
                                    <Switch
                                        onChange={this.handleChange}
                                        checked={this.props.checked1}
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
                                </Column>
                            </Row>
                        </label>
                        <div style={styles.divider} />
                        <label style={styles.block}>
                            <Row justifyContent="space-between">
                                <Column flexGrow={4}>
                                    <span>Disable drag to open sidebar</span>
                                </Column>
                                <Column flexGrow={1}>
                                    <Switch
                                        onChange={this.handleDrag}
                                        checked={this.props.checked2}
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
                                </Column>
                            </Row>
                        </label>
                        <div style={styles.divider} />
                    </div>
                </Panel>
            </Sidebar>
        );
    }
}

export default Settings