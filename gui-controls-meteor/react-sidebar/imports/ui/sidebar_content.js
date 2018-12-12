import React from "react";
import PropTypes from "prop-types";
import Panel from "./panel";

const styles = {
    sidebar: {
        width: 256,
        height: "100%"
    },
    sidebarLink: {
        display: "block",
        padding: "16px 16px",
        color: "#FFFFFF",
        textDecoration: "none"
        //fontWeight: "bold"
    },
    divider: {
        margin: "0 16px",
        height: 1,
        backgroundColor: "white"
    },
    content: {
        padding: "16px",
        height: "100%",
        backgroundColor: "#FFFFFF"
    }
};

const SidebarContent = props => {
    const style = props.style
        ? { ...style.sidebar, ...props.style }
        : styles.sidebar;

    return (
        <Panel title="Menu" style={style}>
            <div style={style.content}>
                <a href="/index" style={styles.sidebarLink}>
                    <i className="fa fa-home" />
                    <span> Home</span>
                </a>
                <div style={styles.divider} />
                <a href="/geotracker" style={styles.sidebarLink}>
                    <i className="fa fa-compass" />
                    <span> Location</span>
                </a>
                <div style={styles.divider} />
                <a href="/images" style={styles.sidebarLink}>
                    <i className="fa fa-image" />
                    <span> Images</span>
                </a>
                <div style={styles.divider} />
                <a href="/settings" style={styles.sidebarLink}>
                    <i className="fa fa-gear" />
                    <span> Settings</span>
                </a>
                <div style={styles.divider} />
                <a href="/demo_graphics" style={styles.sidebarLink}>
                    <i className="fa fa-cubes"/>
                    <span> Demo: Graphics I</span>
                </a>
                <div style={styles.divider} />
                  <a href="/demo_maps" style={styles.sidebarLink}>
                    <i className="fa fa-map-marker"/>
                    <span> Demo: Maps</span>
                </a>
                <div style={styles.divider} />
            </div>
        </Panel>
    );
};

SidebarContent.propTypes = {
    style: PropTypes.object
};

export default SidebarContent;
