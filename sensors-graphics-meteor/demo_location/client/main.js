import React from "react";
import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { render } from "react-dom";
import "./main.html";

import App from "../imports/ui/App.jsx";
import "../imports/startup/accounts-config.jsx";

Meteor.startup(() => {
    render(<App />, document.getElementById("render-target"));
    
});

Template.map.onRendered(function() {
    GoogleMaps.load({
        v: "3",
        key: "PUT A BROWSER KEY HERE"
    });
});
Template.map.helpers({
    exampleMapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 1
            };
        }
    }
});
