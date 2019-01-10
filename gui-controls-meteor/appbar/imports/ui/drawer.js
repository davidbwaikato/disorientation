import React from "react";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Home from 'material-ui/svg-icons/action/home';
import Directions from 'material-ui/svg-icons/maps/directions';
import Settings from 'material-ui/svg-icons/action/settings';
import Collections from 'material-ui/svg-icons/image/collections';
import history from "../../client/history"

import Panel from "./panel.js";

const styles = {
    content: {
        fontSize: "1.5em",
    },
    header: {
        padding: "32px, 0"
    }
};

const Draw = (props) => {
    return(
        <Drawer
            docked={false}
            width={250}
            open={props.open}
            openSecondary={props.openSecondary}
            onRequestChange={props.handleClose}
            disableSwipeToOpen={true}
            style={styles.content}
        >
            <Panel title="Menu"></Panel>
            <ListItem primaryText="Home" leftIcon={<Home />} onClick={() => history.push("/index")} />
            <ListItem primaryText="Geolocation" leftIcon={<Directions />} onClick={() => history.push("/geotracker")} />
            <ListItem primaryText="Images" leftIcon={<Collections />} onClick={() => history.push("/images")} />
            <ListItem primaryText="Settings" leftIcon={<Settings />} onClick={() => history.push("/settings")} />
            <Divider />
            <Subheader inset={true}>Nested</Subheader>
            <ListItem 
                primaryText="Nested" 
                primaryTogglesNestedList={true}
                nestedItems={[
                    <ListItem key={1} primaryText="Nested1" />,
                    <ListItem key={2} primaryText="Nested2" />
                ]}
            />
        </Drawer>
    );
};

export default Draw;