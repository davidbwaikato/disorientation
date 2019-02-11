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

import Navbar from "./appbar.js";
import Draw from "./drawer.js";
import history from "../../client/history.js";
import "./appbar.css";
import { CardContent, Typography } from "@material-ui/core";

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
            zoom: 17
        };
        
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
        var southWest = [{lat: -37.790545}, {lng: 175.308736}];
        var northEast = [{lat: -37.7849526}, {lng: 175.3226781}];
        return (
            <Paper className="root cmh_v-flex-align-wrapper">
                <div style={{ paddingTop: 72 }}>
                    <Card className="card" style={{ "margin": "20px 10px 20px 10px", "background": Meteor.appstate.muiTheme.palette.primary1Color}}>
                        <CardContent>
                            <CardTitle variant="h5" component="h2" Color={Meteor.appstate.muiTheme.palette.textColor}>
                                Current Location:
                            </CardTitle>
                            <CardText variant="h5" component="h2">
                                -173.22342, 281.91012
                            </CardText>
                        </CardContent>
                    </Card>
                </div>
                <Divider/>
                    <div className = "cmh_v-flex-align-child" style={{"margin": "20px 10px"}}>
                    <LeafletMap className="leaflet-padded"  center={position} zoom={this.state.zoom} ref={map => this.map = map} >
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
                        <Routing map={this.map} className="black"/>
                    </LeafletMap>
                </div>
            </Paper>
        );
    }
}

export default withTheme()(Heatmap);