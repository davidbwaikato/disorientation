import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from 'react-responsive-carousel';
import { Column, Row } from "simple-flexbox";

import Sidebar from "./sidebar";
import Panel from "./panel";
import SidebarContent from "./sidebar_content";
import "./carousel.min.css";

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
    panel: {
        position: "-webkit-sticky",
        position: "sticky",
        top: 0,
        zIndex: 2
    }
};

class Images extends Component {
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
        const className = this.props.checked;

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
                <Panel title={contentHeader} style={styles.panel}></Panel>
                <body style={{ height: window.innerHeight }} className={className}>
                    <div style={styles.content}>
                        <Carousel showArrows={false} style={{ zIndex: 1 }}>
                            <div>
                                <img src="../../waikato1.jpg" />
                            </div>
                            <div>
                                <img src="../../waikato2.jpg" />
                            </div>
                            <div>
                                <img src="../../waikato3.jpg" />
                            </div>
                            <div>
                                <img src="../../waikato4.jpg" />
                            </div>
                            <div>
                                <img src="../../waikato5.JPG" />
                            </div>
                            <div>
                                <img src="../../waikato6.jpg" />
                            </div>
                        </Carousel>
                    </div>
                </body>
            </Sidebar>
        )
    }
}

export default Images