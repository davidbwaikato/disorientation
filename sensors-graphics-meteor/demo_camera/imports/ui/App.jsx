import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Tasks } from "../api/tasks.js";
import "../api/users.jsx";
import Task from "./Task.jsx";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";

import AccountsUIWrapper from "./AccountsUIWrapper.jsx";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompleted: false
        };
    }
    handleSubmit(event) {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Meteor.call("tasks.insert", text);
        //Clear
        ReactDOM.findDOMNode(this.refs.textInput).value = "";
    }
    handleCamera(event) {
        MeteorCamera.getPicture((error, data) => {
            //alert(error);
            if (data != undefined) {
                ReactDOM.findDOMNode(this.refs.lastImage).src = data;
                alert(data);
                if (this.props.currentUser != null)
                    Meteor.call(
                        "users.update",
                        this.props.currentUser._id,
                        data
                    );
            }
        });
    }
    toggleHideComplete() {
        this.setState({
            showCompleted: !this.state.showCompleted
        });
    }
    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (!this.state.showCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }

        return filteredTasks.map(task => {
            const currentUserId =
                this.props.currentUser && this.props.currentUser._id;

            const showPrivateButton = task.owner === currentUserId;

            return (
                <Task
                    key={task._id}
                    task={task}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }
    //Seems to return HTML Content
    render() {
        return (
            <div className="container">
                <h1> Todo List ({this.props.incompleteCount})</h1>
                <header>
                    <div className="header-options">
                        <label className="hide-completed checkbox-label">
                            <input
                                className="checkbox-hitbox"
                                type="checkbox"
                                readOnly
                                id="CB001"
                                checked={this.state.showCompleted}
                                onClick={this.toggleHideComplete.bind(this)}
                            />
                            <span className="checkbox-span">
                                Show Completed
                            </span>
                        </label>
                        <AccountsUIWrapper />
                    </div>
                    {this.props.currentUser ? (
                        <form
                            className="new-task"
                            onSubmit={this.handleSubmit.bind(this)}
                        >
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new tasks"
                            />
                        </form>
                    ) : (
                        ""
                    )}
                </header>
                <div>
                    <button onClick={this.handleCamera.bind(this)}>
                        Camera
                    </button>
                </div>
                <ul> {this.renderTasks()}</ul>{" "}
                <img ref="lastImage" src={(Meteor.user() != undefined ? this.getImage() : "")} />
            </div>
        );
    }
    getImage() {
        if (this.props.currentUser != null) {
            Meteor.call("users.fetch", this.props.currentUser._id, function(
                error,
                result
            ) {
                //alert(result.toString());
                // alert(error);
                if (error == undefined) {
                    return result.image.toString();
                } else {
                    return "";
                }
            });
        } else return "";
    }
}

export default withTracker(() => {
    Meteor.subscribe("tasks");
    Meteor.subscribe("users");
    
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
   
    };
})(App);
