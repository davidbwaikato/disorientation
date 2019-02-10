import React from "react";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Home from 'material-ui/svg-icons/action/home';
import Directions from 'material-ui/svg-icons/maps/directions';
import Settings from 'material-ui/svg-icons/action/settings';
import Collections from 'material-ui/svg-icons/image/collections';
import Person from 'material-ui/svg-icons/social/person';
import Videocam from 'material-ui/svg-icons/av/videocam';
import history from "../../client/history";
import { grey800, grey700, grey100 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import Panel from "./panel.js";
import "./appbar.css";

const styles = {
    content: {
        fontSize: "1.5em",
        width: 250,
        color: grey800
    },
    headerRed: {
        backgroundColor: "#ED3628",
        color: "black",
        padding: "14px",
        fontSize: "1.0em",
    },
    headerOrange: {
        backgroundColor: "#F1AD1D",
        color: "black",
        padding: "14px",
        fontSize: "1.0em",
    },
    headerDark: {
        backgroundColor: grey700,
        color: grey100,
        padding: "14px",
        fontSize: "1.0em",
    },
    list: {
        width: 250
    },
};

const Draw = (props) => {
    let colour;
    let back;
    switch(props.theme) {
        case "redMuiTheme":
            colour = styles.headerRed;
            break;
        case "orangeMuiTheme":
            colour = styles.headerOrange;
            break;
        case "darkMuiTheme":
            colour = styles.headerDark;
            break;
    }
    
    const sideList = (
        <Paper className="root">
            <Panel title="Menu" header={colour}></Panel>
            <MenuItem primaryText="Home" leftIcon={<Home />} onClick={() => history.push("/index")} />
            <MenuItem primaryText="Geolocation" leftIcon={<Directions />} onClick={() => history.push("/geotracker")} />
            <MenuItem primaryText="Images" leftIcon={<Collections />} onClick={() => history.push("/images")} />
            <MenuItem primaryText="Video" leftIcon={<Videocam />} onClick={() => history.push("/video")} />
            <MenuItem primaryText="Map" leftIcon={<Videocam />} onClick={() => history.push("/map")} />
            <MenuItem primaryText="Settings" leftIcon={<Settings />} onClick={() => history.push("/settings")} />
            <Divider />
            <Subheader inset={true}>Nested</Subheader>
            <MenuItem 
                primaryText="Nested" 
                primaryTogglesNestedList={true}
                nestedItems={[
                    <MenuItem key={1} primaryText="Nested1" />,
                    <MenuItem key={2} primaryText="Nested2" />
                ]}
            />
            <Divider />
            <MenuItem primaryText="Logout" leftIcon={<Person />} onClick={props.onLogin} />
        </Paper>
    )

    
    return(
        <div>
            <SwipeableDrawer
                open={props.left}
                onClose={props.toggleDrawer('left', false)}
                onOpen={props.toggleDrawer('left', true)}
                disableBackdropTransition={true}
                disableSwipeToOpen={props.toggle}
                style={styles.content}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={props.toggleDrawer('left', false)}
                    onKeyDown={props.toggleDrawer('left', false)}
                    style={styles.list}
                >
                    {sideList}
                </div>
            </SwipeableDrawer>

            <SwipeableDrawer
                anchor="right"
                open={props.right}
                onClose={props.toggleDrawer('right', false)}
                onOpen={props.toggleDrawer('right', true)}
                disableBackdropTransition={true}
                disableSwipeToOpen={!props.toggle}
                style={styles.content}
            >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={props.toggleDrawer('right', false)}
                    onKeyDown={props.toggleDrawer('right', false)}
                    style={styles.list}
                >
                    {sideList}
                </div>
            </SwipeableDrawer>
        </div>
    );
};

export default Draw;