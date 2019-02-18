import React, { Component } from "react";
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import ReactLeaflet, { latLng, latLngBounds } from "react-leaflet";

import Navbar from "./appbar.js";
import Draw from "./drawer.js";
import Routing from './routing.js';
import "./appbar.css";

import THREE from "./libs/three.js"
import "./libs/stats.js"
import "./libs/dat.gui.js"
import "./libs/d3-threeD.js"
import "./libs/OrbitControls.js"
import "./libs/SVGLoader.js"
import "./libs/trilateration.js"

import {preinit, updateLocationMarker} from "./libs/map3d-src.js";

// const { 
//     Map: LeafletMap, TileLayer, Marker, Popup, CircleMarker, SVG,
// } = ReactLeaflet

class Map3D extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            lat: -37.7888634,
            lng: 175.3176464,
        };
    }
    
    componentDidMount() {
        var latLng = new ReactiveVar();
        this.track = Tracker.autorun(() => {
            latLng.set(Geolocation.latLng());
            if(latLng.get()) {
                console.log(latLng.curValue);
                updateLocationMarker(latLng.curValue.lng, latLng.curValue.lat)
            }
        });
        preinit()

    }

    componentWillUnmount() {
        if(this.track) {
            this.track.stop();
            console.log("Tracker stopped");
        }
        
    }
    
    render() {
        return (
            <Paper className="root">
                <div id="WebGL-output"></div>
            </Paper>
        );
    }
}

export default Map3D;