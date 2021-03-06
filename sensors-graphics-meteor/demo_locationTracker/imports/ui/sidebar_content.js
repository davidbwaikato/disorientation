import React from "react";
import PropTypes from "prop-types";
import Panel from "./panel";
import history from "../../client/history"

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
                <a className="style" style={styles.sidebarLink} onClick={() => history.push("/index")}>
                    <i className="fa fa-home"></i>
                    <span> Home</span>
                </a>
                <div style={styles.divider} />
                <a className="style" style={styles.sidebarLink} onClick={() => history.push("/geotracker")}>
                    <i className="fa fa-compass"></i>
                    <span> Location</span>
                </a>
                <div style={styles.divider} />
                <a className="style" style={styles.sidebarLink} onClick={() => history.push("/images")}>
                    <i className="fa fa-image"></i>
                    <span> Images</span>
                </a>
                <div style={styles.divider} />
                <a className="style" style={styles.sidebarLink} onClick={() => history.push("/settings")}>
                    <i className="fa fa-gear"></i>
                    <span> Settings</span>
                </a>
                <div style={styles.divider} />
                <a href="/login" className="style" style={styles.sidebarLink}>
                    <i className="fa fa-sign-out"></i>
                    <span> Logout</span>
                </a>
                <div style={styles.divider} />
                <a className="style" style={styles.sidebarLink} onClick={() => history.push("/demo_graphics")}>
                    <i className="fa fa-cubes"/>
                    <span> Demo: Graphics I</span>
                </a>
                <div style={styles.divider} />
                <a className="style" style={styles.sidebarLink} onClick={() => history.push("/demo_maps")}>
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
