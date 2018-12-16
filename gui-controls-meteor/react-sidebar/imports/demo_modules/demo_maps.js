import { render } from "react-dom";
import React, { Component } from "react";

import Building from "./demo_map/Building.jsx";
import Sidebar from "../ui/sidebar";
import Panel from "../ui/panel";
import SidebarContent from "../ui/sidebar_content";

const styles = {
    contentHeaderMenuLink: {
        backgroundColor: "transparent",
        background: "transparent",
        textDecoration: "none",
        color: "white",
        padding: 8
    },
    content: {
        padding: "16px"
    },
    switch: {
        padding: "0"
    },
    divider: {
        margin: "16px 0",
        height: 1,
        backgroundColor: "#e0e0e0"
    },
    block: {
        display: "block",
        padding: "12px 12px",
        color: "#000000",
        textDecoration: "none"
        //fontWeight: "bold"
    }
};
class GMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            dragToggleDistance: 50
        };

        if (Meteor.mapKey == undefined)
            Meteor.mapKey = prompt("Please Enter your Google Maps API Key");
        GoogleMaps.load({
            v: "3",
            key: Meteor.mapKey
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
        this.menuButtonClick = this.menuButtonClick.bind(this);
        this.tryload();
    }

    handleChange(checked1) {
        this.props.onPullChange(checked1);
    }

    handleDrag(checked2) {
        this.props.onDragChange(checked2);
    }

    onSetOpen(open) {
        this.setState({ open });
    }

    menuButtonClick(ev) {
        ev.preventDefault();
        this.onSetOpen(!this.state.open);
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    //render(<App />, document.getElementById("render-target")
    //);
    render() {
        const sidebar = <SidebarContent />;

        const contentHeader = (
            <span>
                <a
                    onClick={this.menuButtonClick}
                    href="#"
                    style={styles.contentHeaderMenuLink}
                >
                    ☰
                </a>
                <span />
            </span>
        );

        const sidebarProps = {
            sidebar,
            docked: this.state.docked,
            sidebarClassName: "custom-sidebar-class",
            contentId: "custom-sidebar-content-id",
            open: this.state.open,
            touch: this.state.touch,
            shadow: this.state.shadow,
            pullRight: this.props.pullRight,
            touchHandleWidth: this.props.touchHandleWidth,
            dragToggleDistance: this.state.dragToggleDistance,
            transitions: this.state.transitions,
            onSetOpen: this.onSetOpen
        };

        return (
            <Sidebar {...sidebarProps}>
                <Panel title={contentHeader} />
                <div
                    id="map-container"
                    style={{
                        overflow: "hidden",
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    }}
                />
            </Sidebar>
        );
    }
    async tryload() {
        while (!GoogleMaps.loaded()) await this.sleep(100);
        console.log("Google Maps Loaded");
        while (!$("#map-container").size()) await this.sleep(100);
        var opts = {
            center: new google.maps.LatLng(-37.788921, 175.317578),
            zoom: 20
        };
        Meteor.map = new google.maps.Map(
            document.getElementById("map-container"),
            opts
        );
    }
    /*
Template.body.helpers({
    exampleMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(-37.788921, 175.317578),
                zoom: 20
            };
        }
    }
});
Template.body.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.

    GoogleMaps.ready("map", function(map) {
        // Add a marker to the map once it's ready
      //  var marker = new google.maps.Marker({
           // position: map.options.center,
        //   map: map.instance
       // });
        Meteor.Buildings = [];
        Meteor.Buildings.push(new Building("G Block", [
        { lat: -37.788834, lng: 175.317773 },
        { lat: -37.788838, lng: 175.317418 },
        { lat: -37.788938, lng: 175.317422 },
        { lat: -37.788939, lng: 175.317378 },
        { lat: -37.789036, lng: 175.317378 },
        { lat: -37.789035, lng: 175.317424 },
        { lat: -37.789119, lng: 175.317424 },
        { lat: -37.789118, lng: 175.317775 }
    ]));
    });
});
*/
}
export default GMap;
