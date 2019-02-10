import React, { Component } from "react";
import Switch from "react-switch";
import { Column, Row } from 'simple-flexbox';
import { Link } from "react-router-dom";

import "./settings.css"
import Sidebar from "./sidebar";
import Panel from "./panel";
import SidebarContent from "./sidebar_content";

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
        paddingTop: "28px",
        color: "#000000",
        textDecoration: "none",
        fontWeight: "normal"
    },
    block2: {
        display: "block",
        padding: "28px 16px",
        paddingBottom: "28px",
        color: "#000000",
        textDecoration: "none",
        fontWeight: "normal"
    },
    arrow: {
        paddingTop: "4px",
        color: "#9b9b9b"
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
            dragToggleDistance: 30
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
            <Row>
                <Column flexGrow={this.props.growStart}>
                    <div></div>
                </Column>
                <Column flexGrow={1}>
                    <span>
                        <a
                            onClick={this.menuButtonClick}
                            href="#"
                            style={styles.contentHeaderMenuLink}
                        >
                            <i className="fa fa-bars"></i>
                        </a>
                        <span></span>
                    </span>
                </Column>
                <Column flexGrow={this.props.growEnd}>
                    <div></div>
                </Column>
            </Row>
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
                                <Column flexGrow={10}>
                                    <span>Change sidebar anchor to right</span>
                                </Column>
                                <Column flexGrow={1}>
                                    <Switch
                                        onChange={this.handleChange}
                                        checked={this.props.checked1}
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
                                <Column flexGrow={10}>
                                    <span>Disable drag to open sidebar</span>
                                </Column>
                                <Column flexGrow={1}>
                                    <Switch
                                        onChange={this.handleDrag}
                                        checked={this.props.checked2}
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
                        <Link to="/settings/page" className="style" style={styles.block2}>
                            <Row>
                                <Column flexGrow={10}>
                                    <span>Setting</span>
                                </Column>
                                <Column flexGrow={1}>
                                    <i className="fa fa-chevron-right" style={styles.arrow}></i>
                                </Column>
                            </Row>
                        </Link>
                        <div style={styles.divider} />
                    </div>
                </Panel>
            </Sidebar>
        );
    }
}

export default Settings