import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ReactDOM, { render } from "react-dom";
import { Link } from 'react-router-dom'

import Path from "../../client/path.js";
import App from "./app.js"

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
    },
    error: {
        color: "red"
    }
};

function validate(id, password) {
    const errors = [];
    const num = /^[0-9\b]+$/;
    
    if (id.length != 7 ) {
        errors.push("ID must be 7 digits long");
    }
    
    if (!num.test(id)) {
        errors.push("ID must be a number");
    }

    if (password.length < 6) {
        errors.push("Password should be at least 6 characters long");
    }

    return errors;
}


class Login extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            id: "",
            password: "",
            
            errors: []
        };
        
        Meteor.appstate.auth = false;
    }
    
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    
    handleSubmit = e => {
        const { id, password } = this.state;

        const errors = validate(id, password);
        
        if (errors.length > 0) {
            e.preventDefault();
            this.setState({ errors });
            return;
        } else {
            Meteor.appstate.auth = true;
            <App />
        }
    }
    
    render() {
        const { errors } = this.state;
        return (
            <div className="Login" style={styles.content}>
                <div className="text-center" style={{ margin: "10px 0" }}>
                    <h4>Sign in</h4>
                </div>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    {errors.map(error => (
                        <p key={error} style={styles.error}>Error: {error}</p>
                    ))}
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