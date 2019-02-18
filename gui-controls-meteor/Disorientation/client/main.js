import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from "../imports/ui/app.js";
import Main from "../imports/ui/main.js"

Meteor.startup(() => {
    if(Meteor.isCordova){
        StatusBar.styleLightContent();
    }
    Meteor.appstate = new Proxy({}, {
            set: function (target, key, value) {
                localStorage.setItem("appstate_"+key, JSON.stringify(value));
                return true;
            },
            get: function(obj, prop) {
                return JSON.parse(localStorage.getItem("appstate_"+prop));
            }
    });
    ReactDOM.render(<Main />, document.getElementById("app"));
});
