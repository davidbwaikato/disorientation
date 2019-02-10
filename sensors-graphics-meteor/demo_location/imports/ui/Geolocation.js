import React, { Component } from 'react';
import { Geolocation } from 'meteor/mdg:geolocation';
import { Meteor } from 'meteor/meteor';

//DB
import { HP } from '../api/Hotpoints.jsx';
import { withTracker } from 'meteor/react-meteor-data';

class GeolocationX extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            tlLAT: -37.780578,// -37.780623,
            tlLNG: 175.308758,//175.310581,
            brLAT: -37.791082,//-37.791095, 
            brLNG: 175.324863,//175.324817,
            mapWidth: 1150,
            mapHeight: 1200,
            error: null,
            mapImg: new Image(),
            markerImg: new Image(),
            drawMarker: false,
            scrCoordX: 0,
            scrCoordY: 0
        };

        this.state.mapImg.src = "Campus_Map.png";
        this.state.markerImg.src = "mapMarker.png";

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
    getLocation() {
        var latLng = new ReactiveVar();

        this.track = Tracker.autorun(() => {
            latLng.set(Geolocation.latLng());
            if (latLng.get()) {


                this.setState({
                    //Write latitude to console and alter textbox value
                    latitude: latLng.curValue.lat,
                    //Write longitude to console and alter textbox value
                    longitude: latLng.curValue.lng,
                    error: null,
                });
                fetch('https://json.geoiplookup.io').then(function (response) { return response.json(); }).then(function (data) {
                    // HP.insert({createdAt: new Date(), lat: latLng.curValue.lat, long: latLng.curValue.long, src: 'json.geoiplookup/api', ip: data.ip, host: data.hostname, stordat: data.district + ", " + data.country_code });
                    if (latLng != undefined)
                        Meteor.call("hotpoints.insert", data, latLng);
                })

            }
        });

    }

    render() {

        return (
            /*
          <div style={{ flexGrow: 1, display: 'block', alignItems: 'center', justifyContent: 'center' }}>
            <p>Latitude: {this.state.latitude}</p>
            <p>Longitude: {this.state.longitude}</p>
            {this.state.error ? <p>Error: {this.state.error}</p> : null}
          </div>
          */
            <div>
                <div style={{ flexGrow: 1, display: 'block', alignItems: 'center', justifyContent: 'center' }}>
                    <p>Latitude: {this.state.latitude}</p>
                    <p>Longitude: {this.state.longitude}</p>
                    {this.state.error ? <p style={{ color: 'Red' }}>Error: {this.state.error}</p> : null}


                </div>
                <canvas ref="mapcan" style={{ /*background: 'url("Campus_Map.svg") top center no-repeat',*/ position: "absolute", height: '100%', top: 0, left: 0, width: '100%' }}> </canvas>
            </div>
        );
    }

    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.mapcan.getContext('2d');
        ctx.clearRect(0, 0, this.refs.mapcan.width, this.refs.mapcan.height);
        this.refs.mapcan.width = this.refs.mapcan.clientWidth;
        this.refs.mapcan.height = this.refs.mapcan.clientHeight;


        Meteor.ctx = ctx;
        Meteor.states = this.state;

        //alert((this.state.latitude < this.state.topLeftLAT) + " " + (this.state.latitude > this.state.topLeftLAT - this.state.mapWidth / 111000 )+ " " + (this.state.longitude > this.state.topLeftLNG) + " "+( this.state.longitude < this.state.topLeftLNG + this.state.mapHeight / 111000));
        //if (this.state.latitude != undefined && this.state.longitude != undefined && (this.state.latitude < this.state.topLeftLAT) + " " + (this.state.latitude > this.state.topLeftLAT - this.state.mapWidth / 111000 )+ " " + (this.state.longitude > this.state.topLeftLNG) + " "+( this.state.longitude < this.state.topLeftLNG + this.state.mapHeight / 111000 / Math.cos(this.state.latitude * (Math.PI/180)))) {
        // this.state.scrCoordY = (this.state.topLeftLNG - this.state.longitude) * -111000* Math.cos(this.state.latitude * (Math.PI/180))* (this.refs.mapcan.height/this.state.mapHeight);
        //this.state.scrCoordX = (this.state.latitude - this.state.topLeftLAT) * -111000* (this.refs.mapcan.width/this.state.mapWidth);

        this.state.scrCoordY = this.refs.mapcan.height * (((this.state.tlLAT - this.state.latitude) / (this.state.tlLAT - this.state.brLAT)));
        this.state.scrCoordX = this.refs.mapcan.width * (((this.state.tlLNG - this.state.longitude) / (this.state.tlLNG - this.state.brLNG)));
        //alert(this.refs.mapcan.width + " " + this.refs.mapcan.height + " " + this.state.scrCoordX + " " + this.state.scrCoordY + " " + this.state.longitude + " " + this.state.latitude + " ");
        if (this.state.mapImg != null)
            ctx.drawImage(this.state.mapImg, 0, 0, this.refs.mapcan.width, this.refs.mapcan.height);

        //ctx.fillRect(, 5,5);
        ctx.drawImage(this.state.markerImg, this.state.scrCoordX, this.state.scrCoordY);
        ctx.fillRect(100, 100, 5, 5);
        //}
        // else {
        // if (this.state.latitude != null && this.state.longitude != null)
        //alert("Warning: User Position outside of Map Bounds");
        // }
    }
}

export default GeolocationX;
