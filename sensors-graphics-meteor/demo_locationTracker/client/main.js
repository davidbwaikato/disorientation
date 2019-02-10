import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Path from "./path.js";
import Login from "../imports/ui/login.js";
import App from "./app.js";

Meteor.startup(() => {
    if (Meteor.isCordova) {
        StatusBar.hide();
    }
    Meteor.appstate = new Proxy({}, {
        set: function (target, key, value) {
            if (!(key in Meteor.appstatemethods)) {
                localStorage.setItem("appstate_" + key, JSON.stringify(value));
                return true;
            }
            return false;
        },
        get: function (target, key) {
            if (key in Meteor.appstatemethods) return Meteor.appstatemethods[key]
            return JSON.parse(localStorage.getItem("appstate_" + key));
        }
    });
    Meteor.appstatemethods = {
        has: function (key) { return (("appstate_" + key) in localStorage) },
        setDefault: function (key, value) { if (!Meteor.appstate.has(key)) localStorage.setItem("appstate_" + key, JSON.stringify(value)); },
    }
    ReactDOM.render(<App />, document.getElementById("app"));
});
