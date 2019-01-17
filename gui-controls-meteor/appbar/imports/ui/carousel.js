import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from 'react-responsive-carousel';
import Paper from 'material-ui/Paper';

import "./carousel.min.css";
import Navbar from "./appbar.js";
import Draw from "./drawer.js";

const styles = {
    content: {
        paddingTop: "80px",
        paddingLeft: "16px",
        paddingRight: "16px"
    },
    root: { 
        position: "absolute", 
        top: "0", 
        bottom: "0",
        left: "0",
        right: "0",
    }
};

class Images extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            left: false,
            right: false,
            openSecondary: this.props.openSecondary
        };
        
        this.onClick = this.onClick.bind(this);
    }
    
    onClick = (side, open) => () => {
        this.setState({ [side]: open });
    }
    
    render() {
        return (
            <Paper style={styles.root}>
                <Navbar onClick={this.onClick} toggle={this.state.openSecondary} />
                <div style={styles.content}>
                    <Carousel showArrows={false} style={{ zIndex: 1 }}>
                        <div>
                            <img src="../../waikato1.jpg" />
                        </div>
                        <div>
                            <img src="../../waikato2.jpg" />
                        </div>
                        <div>
                            <img src="../../waikato3.jpg" />
                        </div>
                        <div>
                            <img src="../../waikato4.jpg" />
                        </div>
                        <div>
                            <img src="../../waikato5.JPG" />
                        </div>
                        <div>
                            <img src="../../waikato6.jpg" />
                        </div>
                    </Carousel>
                </div>
                <Draw 
                    toggleDrawer={this.onClick} 
                    left={this.state.left}
                    right={this.state.right}
                    theme={this.props.theme}
                />
            </Paper>
        )
    }
}

export default Images