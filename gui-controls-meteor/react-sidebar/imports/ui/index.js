import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Column, Row } from "simple-flexbox";

import Sidebar from "./sidebar";
import Panel from "./panel";
import SidebarContent from "./sidebar_content";

const styles = {
    contentHeaderMenuLink: {
        textDecoration: "none",
        color: "white",
        padding: 8
    },
    content: {
        padding: "16px",
        textAlign: "center"
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            dragToggleDistance: 40
        };
        
        this.onSetOpen = this.onSetOpen.bind(this);
        this.menuButtonClick = this.menuButtonClick.bind(this);
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

        return (
            <Sidebar {...sidebarProps}>
                <Panel title={contentHeader}>
                    <div style={styles.content}>
                        <h3>Hello world!</h3>
                    </div>
                </Panel>
            </Sidebar>
        );
    }
}

export default Home;








