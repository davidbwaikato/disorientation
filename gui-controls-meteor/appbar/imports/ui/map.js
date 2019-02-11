import React, { Component } from "react";
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import ReactLeaflet, { latLng, latLngBounds } from "react-leaflet";

import Routing from './routing.js';
import "./appbar.css";

const { 
    Map: LeafletMap, TileLayer, Marker, Popup, CircleMarker, SVG,
} = ReactLeaflet

class Map extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            left: false,
            right: false,
            lat: -37.7888634,
            lng: 175.3176464,
            latC: 0,
            lngC: 0,
            zoom: 17
        };
    }
    
    componentDidMount() {
        var latLng = new ReactiveVar();
        this.track = Tracker.autorun(() => {
            latLng.set(Geolocation.latLng());
            if(latLng.get()) {
                console.log(latLng.curValue);
                this.setState({ lat: latLng.curValue.lat });
                this.setState({ lng: latLng.curValue.lng });
            }
        });
    }

    componentWillUnmount() {
        if(this.track) {
            this.track.stop();
            console.log("Tracker stopped");
        }
    }
    
    render() {
        var w = window.innerWidth;
        var h = window.innerHeight - 64;
        var position = [this.state.lat, this.state.lng];
        var southWest = [{lat: -37.790545}, {lng: 175.308736}];
        var northEast = [{lat: -37.7849526}, {lng: 175.3226781}];
        
        return (
            <Paper className="root" style={{ marginTop: 64 }}>
                <div>
                    <LeafletMap center={position} zoom={this.state.zoom} ref={map => this.map = map} >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <CircleMarker
                            radius={6}
                            opacity={1}
                            fillOpacity={0.7}
                            center={position}
                        />
                        <Routing map={this.map}/>
                    </LeafletMap>
                </div>
            </Paper>
        );
    }
}

export default Map;