import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Column, Row } from "simple-flexbox";

import Sidebar from "./sidebar";
import Panel from "./panel";
import SidebarContent from "./sidebar_content";
import Header from "./header.js";

const styles = {
    content: {
        padding: "16px",
        textAlign: "center"
    },
    panel: {
        position: "-webkit-sticky",
        position: "sticky",
        top: 0,
        zIndex: 1
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
            dragToggleDistance: 30,
            
            y: window.innerHeight
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
                        <h3>Hello world!</h3>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum ligula ut leo molestie consequat. Donec eget malesuada ligula. Nam vitae scelerisque est. Etiam placerat hendrerit quam, vel ornare arcu cursus in. Integer ultrices consequat purus, non finibus erat rhoncus ac. Duis ante diam, placerat eu orci id, elementum convallis lorem. Vestibulum pretium varius leo, quis vulputate justo. Fusce augue quam, tempor vel luctus consequat, finibus id odio. Duis egestas nibh magna, nec tincidunt turpis lobortis vitae. Vivamus hendrerit sollicitudin nunc, id dignissim ante interdum quis. Suspendisse fringilla velit ac neque fermentum finibus. Curabitur ante libero, imperdiet ut ligula non, scelerisque gravida leo. Cras ante leo, euismod vel feugiat sit amet, porta vitae magna. Vivamus vitae imperdiet eros.

Sed sit amet mollis dui, ac venenatis neque. Nunc laoreet quam quam, eget sagittis turpis sodales ut. Morbi ullamcorper, magna id pretium egestas, lorem turpis efficitur quam, ac imperdiet metus nisi vel neque. Quisque eget velit nec odio semper congue. Donec nec suscipit purus. Nulla efficitur turpis id dignissim dignissim. Phasellus nec nibh augue. Curabitur suscipit feugiat lacus, vel blandit neque posuere at.

Vestibulum gravida nunc eget hendrerit tincidunt. Vivamus at tempor sem, nec luctus lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt nibh vel metus tempus, vel tincidunt est lobortis. Sed in mi maximus, pulvinar tortor id, tincidunt orci. Maecenas id malesuada lacus. Maecenas a tincidunt diam. In aliquet quam at mattis lobortis. Praesent in rutrum neque, eget dapibus lectus. In eget aliquam eros. Etiam non urna ipsum. Pellentesque eu imperdiet sapien, sit amet tempus turpis.

Fusce posuere mauris sed pulvinar lacinia. Mauris sagittis venenatis metus nec vulputate. Praesent euismod eros sed sapien suscipit, at tincidunt diam rhoncus. Donec posuere tincidunt ultricies. Donec dignissim egestas luctus. Etiam sed maximus sem. Etiam vel enim eget magna pellentesque blandit. Donec efficitur interdum ante quis lacinia.
                        </p>
                    </div>
                </div>
            </Sidebar>
        );
    }
}

export default Home;









