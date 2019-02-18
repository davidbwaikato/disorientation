import React, { Component } from "react";
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { Column, Row } from 'simple-flexbox';

import "./appbar.css";

const styles = {
    content: {
        paddingTop: "70px",
        paddingLeft: "16px",
        paddingRight: "16px",
    },
    img: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        height: "100%",
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            left: false,
            right: false,
        };
    }
    
    render() {
        return (
            <Paper className="root">
                <div style={styles.content}>
                    <Row>
                        <img src="../../waikato.png" style={styles.img} />
                    </Row>
                    <p style={{ paddingTop: 6 }}> Welcome to the University of Waikato's Orientation Application for 2020! You can view a map of the campus and receive directions anywhere around the university. From this map, you can also view 360° videos of different spots across the campus to help you familiarise with the grounds.
                    </p>
                    <p> There is a small gallery of photos available for you to peruse which highlights some aspects of Waikato University. With the setting page, you will be able to change the theme of the application to suit your tastes.
                    </p>
                    <p> We hope you enjoy the application, as well your experience at Orientation Week!
                    </p>
                </div>
            </Paper>
        );
    }
}

export default Home;









