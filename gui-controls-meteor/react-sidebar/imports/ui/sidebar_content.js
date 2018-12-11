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
        textDecoration: "none",
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
                <a style={styles.sidebarLink} onClick={() => history.push("/index")}>
                    <i className="fa fa-home"></i>
                    <span> Home</span>
                </a>
                <div style={styles.divider} />
                <a style={styles.sidebarLink} onClick={() => history.push("/geotracker")}>
                    <i className="fa fa-compass"></i>
                    <span> Location</span>
                </a>
                <div style={styles.divider} />
                <a style={styles.sidebarLink} onClick={() => history.push("/images")}>
                    <i className="fa fa-image"></i>
                    <span> Images</span>
                </a>
                <div style={styles.divider} />
                <a style={styles.sidebarLink} onClick={() => history.push("/settings")}>
                    <i className="fa fa-gear"></i>
                    <span> Settings</span>
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







