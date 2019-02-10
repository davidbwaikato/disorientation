import React, { Component } from "react"
import ReactPlayer from 'react-player';
import Paper from 'material-ui/Paper';

import Navbar from "./appbar.js";
import Draw from "./drawer.js";
import "./appbar.css";

class Player extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            left: false,
            right: false,
            openSecondary: this.props.openSecondary
        };
        
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle = (side, open) => () => {
        this.setState({ [side]: open });
    }
    
    render() {
        var w = window.innerWidth;
        var percent = (640 - w) / 640;
        var h;
        if(percent > 0) {
            h = 360 * percent;
            h = h + h * 0.75;
        } else if(percent < 0) {
            percent = Math.abs(percent);
            h = 360 + 360 * percent;
        } else if(percent == 0) { h = 360; }
        console.log(percent);
        
        return (
            <Paper className="root">
                <div style={{ paddingTop: 72 }}>
                    <h5>Turn/tilt your phone or swipe using your finger to have a 360 look</h5>
                    <ReactPlayer url="https://youtu.be/5gECD9ocfkE" width={w} height={h} controls playsinline />
                </div>
            </Paper>
        )
    }
}

export default Player;