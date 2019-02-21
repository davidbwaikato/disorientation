import React, { Component } from "react";
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import { withTheme } from '@material-ui/core/styles';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import ReactLeaflet, { latLng, latLngBounds } from "react-leaflet";
import Routing from './routing.js';
import HeatmapOverlay from "../lib/leaflet-heatmap.js";
import { withTracker } from "meteor/react-meteor-data";
import { HP } from "../api/hotpoints.js";

import "./appbar.css";
import { CardContent, Typography, Checkbox } from "@material-ui/core";
import { LatLngBounds } from "leaflet";
import { convertHexToRGB } from "material-ui/utils/colorManipulator";

//See Jane's comments
const {
    Map: LeafletMap, TileLayer, Marker, Popup, CircleMarker, SVG,
} = ReactLeaflet

///HEATMAP COMPONENT
class Heatmap extends Component {

    constructor(props) {
        super(props);

        if (Meteor.appstate.allowtracking == null)
            Meteor.appstate.allowtracking = false;
        this.state = {
            lat: -37.7888634,
            lng: 175.3176464,
            latC: 0,
            lngC: 0,
            zoom: 17,
            addedHeatmap: false

        };

        this.cfg = {
            "radius": 0.0001, //Radius of heatmap
            "maxOpacity": .8,
            "minOpactiy": .2,
            "scaleRadius": true, //Scale with zoom, if false, will display in radius pixels
            "useLocalExtrema": false, //True: Heatmap peaks relative to onscreen points, false: Global
            "latField": 'lat', //Mongo DB field 'lat'
            "lngField": 'lng', //Mongo DB field 'lng' //Mapped into array Below (EoF)
            "valueField": 'value' //Mono DB field 'value'
            //HAS TO BE REDONE SO PTS ADD VALUE, NOT THEMSELVES
            //DONE 14/02/19
        };
        //See https://www.patrick-wied.at/static/heatmapjs/example-heatmap-leaflet.html
        this.heatmapLayer = new HeatmapOverlay(this.cfg);
        Meteor.map = this;
    }
    
    //Tracks user location
    getLocation() {
        var latLng = new ReactiveVar();

        this.track = Tracker.autorun(() => {
            latLng.set(Geolocation.latLng());
            if (latLng.get()) {


                this.setState({
                    latitude: latLng.curValue.lat, //Probaly not needed
                    longitude: latLng.curValue.lng,
                    error: null,
                });
                if (Meteor.appstate.allowtracking == true) { //If user has given tracking permission
                    fetch('https://json.geoiplookup.io').then(function (response) { return response.json(); }).then(function (data) { //Gets IP data
                        if (latLng != undefined)
                            Meteor.call("hotpoints.insertv2", data, latLng); //Defined in api/hotmap.js
                    })


                }
            }
        });

    }

    //Main Render Method
    render() {
        var position = [this.state.lat, this.state.lng];
        return (
            <Paper className="root cmh_v-flex-align-wrapper">
                <div className="cmh_v-flex-align-child" style={{ "margin": "20px 10px", "paddingTop": "72px" }}>
                    <LeafletMap className="leaflet-padded" center={position} zoom={this.state.zoom} ref={map => this.map = map} >
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
                        <Routing map={this.map} className="black" />
                    </LeafletMap>
                </div>
            </Paper>
        );
    }
    //On component update (After render or state change)
    componentDidUpdate() {
        this.updateCanvas();
    }
    componentDidMount() {
        //https://www.google.com/maps
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.getLocation();
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.updateCanvas();
    }
    //Adds Heatmap to canvas if not already added
    updateCanvas() {
        if (!this.state.addedHeatmap && this.map != null && this.map != undefined) {
            this.state.addedHeatmap = true;
            this.map.leafletElement.addLayer(this.heatmapLayer);
            // this.map.leafletElement.setMaxBounds(new LatLngBounds([-37.780578,175.308758],))
            console.log(this.props.hotpoints);
            this.heatmapLayer.setData(this.props.hotpoints);
        }
    }
}
//See meteor website examples
//Watches MongoDB 'hotpoints' collection for changes
//Returns Tasks in format that Heatmap.js understands - see heatmap config above.

////////////////////////////////////////////////////////////////////////////////////
// FOR SOME MYSTERIOUS REASON                                                     //
//                                                                                //
// This code broke below, specifically 'meteor.hp.find({}).fetch()' broke         //
// at the last minute, this refuses to download any documents from the collection,//
// however when run in console has no issues                                      //
//                                                                                //
// Suggestion: Maybe remove tracker and do manually in updatecanvas method? Is    //
// Tracker even needed?                                                           //
////////////////////////////////////////////////////////////////////////////////////
export default withTracker(() => {
    Meteor.subscribe("hotpoints");
    Meteor.HP = HP;

    var h = Meteor.HP.find({}).fetch();
    var max = 0; var min = Number.MAX_SAFE_INTEGER;
    for (var e of h) {
        min = Math.min(e.value, min);
        max = Math.max(e.value, max);
    }
    return {
        hotpoints: {
            data: h, //[{value: ..., lat:..., lng:...}, {...}] format, see mongo db
            min: min, //minimum 'value' for heatmap concentration
            max: max //max 'value' for heatmap concentration
        }
    }

}


)(Heatmap);