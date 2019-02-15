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

import Navbar from "./appbar.js";
import Draw from "./drawer.js";
import history from "../../client/history.js";
import "./appbar.css";
import { CardContent, Typography, Checkbox } from "@material-ui/core";
import { LatLngBounds } from "leaflet";
import { convertHexToRGB } from "material-ui/utils/colorManipulator";

const {
    Map: LeafletMap, TileLayer, Marker, Popup, CircleMarker, SVG,
} = ReactLeaflet

class Heatmap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            left: false,
            right: false,
            openSecondary: this.props.openSecondary,
            lat: -37.7888634,
            lng: 175.3176464,
            latC: 0,
            lngC: 0,
            zoom: 17,
            addedHeatmap: false

        };
      
        this.cfg = {
            "radius": 0.0001,
            "maxOpacity": .8,
            "minOpactiy": .2,
            "scaleRadius": true,
            "useLocalExtrema": false,
            "latField": 'lat',
            "lngField": 'lng',
            "valueField": 'value'
            //HAS TO BE REDONE SO PTS ADD VALUE, NOT THEMSELVES
            //DONE 14/02/19
        };
        this.heatmapLayer = new HeatmapOverlay(this.cfg);
        Meteor.map = this;
      
        this.onClick = this.onClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    onClick = (side, open) => () => {
        this.setState({ [side]: open });
    }

    handleToggle(e) {
        this.setState({ openSecondary: !this.state.openSecondary });
        this.props.handleToggle(this.state.openSecondary);
    }

    render() {
        var w = window.innerWidth;
        var h = window.innerHeight - 64;
        var position = [this.state.lat, this.state.lng];
        var southWest = [{ lat: -37.790545 }, { lng: 175.308736 }];
        var northEast = [{ lat: -37.7849526 }, { lng: 175.3226781 }];
        return (
            <Paper className="root cmh_v-flex-align-wrapper">
                {/* /* <div style={{ paddingTop: 72 }}>
                    <Card className="card" style={{ "margin": "20px 10px 20px 10px", "background": Meteor.appstate.muiTheme.palette.primary1Color }}>
                        <CardContent>
                            <CardTitle variant="h5" component="h2" color={Meteor.appstate.muiTheme.palette.textColor}>
                                Options:
                            </CardTitle>
                            <Checkbox title="Use Local">
                                Use Local Extrema
                            </Checkbox>
                        </CardContent>
                    </Card>
                </div>
                <Divider /> */}
                <div className="cmh_v-flex-align-child" style={{ "margin": "20px 10px", "paddingTop": "72px"}}>
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
    componentDidUpdate() {
        this.updateCanvas();
    }
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

export default withTracker(() => {
    Meteor.subscribe("hotpoints");
    Meteor.HP = HP;
    var h = HP.find({}).fetch();
    var max = 0; var min = Number.MAX_SAFE_INTEGER;
    for(var e of h){
        min = Math.min(e.value,min);
        max = Math.max(e.value,max);
    }
    return {
        hotpoints: {
            data: h,
            min: min,
            max: max
        }
    }
}


)(Heatmap);