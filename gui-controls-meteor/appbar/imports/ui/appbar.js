import React from "react";
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    header: {
        padding: "16px, 0",
        fontSize: "1.5em",
        position: "fixed",
        top: "0",
        left: "0",
        content: "\e625"
    }
};

const Navbar = (props) => {
    
    if(props.setting == true) {
        return (
            <AppBar
                style={styles.header}
                title=""
                iconElementLeft={
                <IconButton>
                    <FontIcon className="material-icons">arrow_back</FontIcon>
                </IconButton>
                }
                onLeftIconButtonClick={props.onClick} 
            />
        )
    } else if(props.toggle == false) {
        return (
            <AppBar
                style={styles.header}
                title="Title"
                onLeftIconButtonClick={props.onClick('left', true)} 
            />
        )
    } else if(props.toggle == true) {
        return (
            <AppBar
                style={styles.header}
                title="Title"
                iconElementRight={
                <IconButton>
                    <FontIcon className="material-icons">menu</FontIcon>
                </IconButton>
                }
                showMenuIconButton={false}
                onRightIconButtonClick={props.onClick('right', true)} 
            />
        )
    }
        
};

export default Navbar;