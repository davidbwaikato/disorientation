import React from "react";
import PropTypes from "prop-types";

const styles = {
    root: {
        fontFamily:
          '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
        fontWeight: 300
    },
    header: {
        backgroundColor: "#ED3628",
        color: "black",
        padding: "14px",
        fontSize: "1.0em",
        //fontWeight: "bold"
    }
};

const Panel = props => {
    const rootStyle = props.style
        ? { ...styles.root, ...props.style }
        : styles.root;

    return (
        <div style={rootStyle}>
            <div style={props.header}>{props.title}</div>
            {props.children}
        </div>
    );
};

Panel.propTypes = {
    style: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.object
};

export default Panel;