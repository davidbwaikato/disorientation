import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from 'react-responsive-carousel';
import { Column, Row } from "simple-flexbox";

import Sidebar from "./sidebar";
import Panel from "./panel";
import SidebarContent from "./sidebar_content";
import "./carousel.min.css";
import Header from "./header.js";

const styles = {
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
            <Header 
                buttonClick={this.menuButtonClick} 
                growStart={this.props.growStart} 
                growEnd={this.props.growEnd} 
            />
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
                <div style={{ height: window.innerHeight }} className={className}>
                    <Panel title={contentHeader} style={styles.panel}></Panel>
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
                </div>
            </Sidebar>
        )
    }
}

export default Images