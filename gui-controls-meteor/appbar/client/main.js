import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from "../imports/ui/app.js";

Meteor.startup(() => {
    if(Meteor.isCordova){
        StatusBar.styleLightContent();
    }
    ReactDOM.render(<App />, document.getElementById("app"));
});
