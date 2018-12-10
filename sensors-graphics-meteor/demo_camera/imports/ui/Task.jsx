import React, { Component } from "react";
import { Tasks } from "../api/tasks.js";
import { Meteor } from "meteor/meteor";
import classnames from "classnames";

export default class Task extends Component {
    render() {
        const taskClassName = classnames({
            checked: this.props.task.checked,
            private: this.props.task.private
        });
        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteTask.bind(this)}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />
                {this.props.showPrivateButton ? (
                    <button
                        className="toggle-private"
                        onClick={this.togglePrivate.bind(this)}
                    >
                        {this.props.task.private ? "🔒" : "🔓"}
                    </button>
                ) : (
                    ""
                )}
                <span className="text">{this.props.task.text} </span>
            </li>
        );
    }
    toggleChecked() {
        Meteor.call(
            "tasks.setChecked",
            this.props.task._id,
            !this.props.task.checked
        );
    }
    deleteTask() {
        Meteor.call("tasks.remove", this.props.task._id);
    }
    togglePrivate() {
        Meteor.call(
            "tasks.setPrivate",
            this.props.task._id,
            !this.props.task.private
        );
    }
}
