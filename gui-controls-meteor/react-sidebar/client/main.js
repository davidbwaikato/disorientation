import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Path from "./path.js";

Meteor.startup(() => {
    if(Meteor.isCordova){
        StatusBar.hide();
    }
    ReactDOM.render(Path(), document.getElementById("app"));
});
