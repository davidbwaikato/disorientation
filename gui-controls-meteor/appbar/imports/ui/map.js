import React, { Component } from "react";
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import ReactLeaflet, { latLng, latLngBounds } from "react-leaflet";
import Fab from '@material-ui/core/Fab';
import CenterFocusStrong from '@material-ui/icons/CenterFocusStrong';

import Routing from './routing.js';
import "./appbar.css";

const styles = {
    content: {
        position: "absolute",
        bottom: "30px",
        right: "20px",
        zIndex: "2",
        outline: "0",
    },
};

const { 
    Map: LeafletMap, TileLayer, Marker, Popup, CircleMarker, SVG,
} = ReactLeaflet
    
class Map extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            left: false,
            right: false,
            lat: 0,
            lng: 0,
            zoom: 17
        };

        this.handleCentre = this.handleCentre.bind(this);
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
    
    handleCentre(e) {
        if(this.state.lat == 0 || this.state.lng == 0 ){
            this.map.leafletElement.panTo([-37.788096, 175.317366]);
        } else if(this.map != null || this.map != undefined) {
            this.map.leafletElement.panTo([this.state.lat, this.state.lng]);
        }
        console.log("set");
    }

    render() {
        var w = window.innerWidth;
        var h = window.innerHeight - 64;
        var position = [this.state.lat, this.state.lng];
        
        return (
            <Paper className="root cmh_v-flex-align-wrapper" style={{ color: "black" }}>
                <div>
                    <Fab color="default" onClick={this.handleCentre} style={styles.content}>
                            <CenterFocusStrong />
                        </Fab>
                    <div className="root cmh_v-flex-align-wrapper">
                    <LeafletMap className="leaflet-padded" center={[-37.788096, 175.317366]} zoom={this.state.zoom} ref={map => this.map = map} style={{ marginTop: 64, position: "relative", zIndex: 1 }}>
                        
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
                </div>
            </Paper>
        );
    }
}

export default Map;