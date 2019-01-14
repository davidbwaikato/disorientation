import React, { Component } from 'react';
import { Geolocation } from 'meteor/mdg:geolocation';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import Navbar from "./appbar.js";
import Draw from "./drawer.js";

const styles = {
    content: {
        paddingTop: "72px",
    },
    root: { 
        position: "absolute", 
        top: "0", 
        bottom: "0",
        left: "0",
        right: "0",
    }
};

class GeoTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            open: false,
            openSecondary: this.props.openSecondary
        }
        
        this.onClick = this.onClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    onClick(e) {
        this.setState({ open: !this.state.open });
    }
    
    handleClose(e) {
        this.setState({ open: false });
    }
    
    componentWillUnmount() {
        if(this.track) {
            this.track.stop();
            console.log("Tracker stopped");
        }
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
        this.track = Tracker.autorun(() => {
            latLng.set(Geolocation.latLng());
            if(latLng.get()) {
                console.log(latLng.curValue);
                //Write latitude to console and alter textbox value
                this.state.lat = latLng.curValue.lat;
                latName.value = latLng.curValue.lat;
                //Write longitude to console and alter textbox value
                this.state.lng = latLng.curValue.lng;
                lngName.value = latLng.curValue.lng;
            }
        });
        
    }
    
    handleChange = (event) => {
        //readOnly text
    }
    
    render() {
        return (
            <Paper style={styles.root}>
                <Navbar onClick={this.onClick} toggle={this.state.openSecondary} />
                <div style={styles.content}>
                    <div className="text-center" style={{ margin: "10px 0" }}>
                        <h4>GPS</h4>
                    </div>
                    <Divider style={{ marginBottom: 16, marginTop: 10 }}/>

                    <div id="gps" style={{ margin: "0 18px" }}>
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
                <Draw 
                    handleClose={this.handleClose} 
                    open={this.state.open} 
                    openSecondary={this.state.openSecondary} 
                    theme={this.props.theme}
                />
            </Paper>
        );
    }
}

export default GeoTracker;