import React, { Component } from "react"
import ReactPlayer from 'react-player';
import Paper from 'material-ui/Paper';

import "./appbar.css";

class Player extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            left: false,
            right: false,
        };
    }
    
    render() {
        var w = window.innerWidth;
        var h = w / 1.5;
        
        return (
            <Paper className="root">
                <div style={{ paddingTop: 72 }}>
                    <h5 style={{ paddingLeft: 6 }}>Turn/tilt your phone or swipe using your finger to have a 360° look</h5>
                    <ReactPlayer url="https://youtu.be/5gECD9ocfkE" width={w} height={h} playsinline controls playing />
                </div>
            </Paper>
        )
    }
}

export default Player;