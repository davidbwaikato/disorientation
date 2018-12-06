import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Path from "./path.js";

Meteor.startup(() => {
    if(Meteor.isCordova){
        StatusBar.hide();
    }
    if(localStorage.getItem("pullRight") == null) {
        var bool = false;
        localStorage.setItem("pullRight", "false");
        localStorage.setItem("touchHandleWidth", "20");
        localStorage.setItem("checked1", JSON.stringify(bool));
        localStorage.setItem("checked2", JSON.stringify(bool));
    }
    if(localStorage.getItem("auth") == false || localStorage.getItem("auth") == null) {
        ReactDOM.render(<Login />, document.getElementById("app"));
    } else {
        ReactDOM.render(<Path />, document.getElementById("app"));
    }
});
