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
        //fontWeight: "bold"
    }
};

const Navbar = (props) => {
        console.log(props.toggle);
        if(props.toggle == false) {
            return (
                <AppBar
                    style={styles.header}
                    title="Title"
                    onLeftIconButtonClick={props.onClick} 
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
                    onRightIconButtonClick={props.onClick} 
                />
            )
        }
        
};

export default Navbar;