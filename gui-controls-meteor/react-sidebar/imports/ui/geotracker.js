import React, { Component } from 'react';
import { Geolocation } from 'meteor/mdg:geolocation';

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
        padding: "16px"
    }
};

class GeoTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            pullRight: false,
            touchHandleWidth: 20,
            dragToggleDistance: 30
        }
        
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
    
    getLocation() {
        var latLng = new ReactiveVar();
        var latName = "";
        var lngName = "";
        var inputs = document.getElementById("latC").elements;
        var inputs2 = document.getElementById("lngC").elements;
        for (var i = 0; i < inputs.length; i++) {
            if(inputs[i].name === "latD" && inputs[i].type === "text") {
                latName = inputs[i];
            }
        }
        for (var i = 0; i < inputs2.length; i++) {
            if(inputs2[i].name === "lngD" && inputs2[i].type === "text") {
                lngName = inputs2[i];
            }
        }
        Tracker.autorun(() => {
            latLng.set(Geolocation.latLng());
            if(latLng.get()) {
                console.log(latLng.curValue);
                //Write latitude to console and alter textbox value
                this.state.lat = latLng.curValue.lat;
                latName.value = latLng.curValue.lat;
                console.log(this.state.lat);
                //Write longitude to console and alter textbox value
                this.state.lng = latLng.curValue.lng;
                lngName.value = latLng.curValue.lng;
                console.log(this.state.lng);
            }
        });
        
    }
    
    handleChange = (event) => {
        //readOnly text
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
        
        return (
            <Sidebar {...sidebarProps}>
                <Panel title={contentHeader}>
                    <div style={styles.content}>
                        <div>
                            <div className="text-center" style={{ margin: "10px 0" }}>
                                <h4>GPS</h4>
                            </div>
                            <hr />

                            <div id="gps" className="jumbotron" style={{ margin: "0 10px" }}>
                                <form id="latC" className="form-group">
                                    <label style={{ margin: "0 10px" }}>Latitude:</label>
                                    <input 
                                        type="text" 
                                        name="latD"
                                        className="form-control"
                                        readOnly="readOnly" 
                                        value={this.state.lat} 
                                        onChange={this.handleChange}
                                    />
                                </form>

                                <form id="lngC" className="form-group">
                                    <label style={{ margin: "0 10px" }}>Longitude:</label>
                                    <input 
                                        type="text" 
                                        name="lngD"
                                        className="form-control"
                                        readOnly="readOnly" 
                                        value={this.state.lng}     
                                        onChange={this.handleChange}
                                    />
                                </form>

                                <button className="btn btn-primary" style={{ margin: "5px 0" }} onClick={this.getLocation.bind(this)}>Get                                           location</button>
                            </div>
                        </div>
                    </div>
                </Panel>
            </Sidebar>
        );
    }
}

export default GeoTracker;