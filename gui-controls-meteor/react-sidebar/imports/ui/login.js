import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ReactDOM, { render } from "react-dom";
import {Link} from 'react-router-dom'

import Path from "../../client/path.js";
import App from "../../client/app.js"
import "./login.css"

const styles = {
    content: {
        padding: "54px 32px"
    },
    button: {
        padding: "18px 50px",
        textAlign: "center"
    },
    Button: {
        width: "140px",
        height: "45px"
    }
};

class Login extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            id: "",
            password: ""
        };
        
        localStorage.setItem("auth", JSON.stringify(false));
    }
    
    validateForm() {
        return this.state.id.length >= 7 && this.state.password.length > 0; 
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    handleSubmit = event => {
        localStorage.setItem("auth", JSON.stringify(true));
        <Path />
    }
    
    render() {
        return (
            <div className="Login" style={styles.content}>
                <div className="text-center" style={{ margin: "10px 0" }}>
                    <h4>Sign in</h4>
                </div>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="id" bsSize="large">
                        <ControlLabel>ID number:</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            placeholder="Enter ID number"
                            value={this.state.id}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password:</ControlLabel>
                        <FormControl
                            type="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <div style={styles.button}>
                        <Button
                            href="/"
                            block
                            bsSize="large"
                            className="btn btn-danger"
                            disabled={!this.validateForm()}
                            type="submit"
                            onClick={this.handleSubmit}
                        >
                        Login
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login