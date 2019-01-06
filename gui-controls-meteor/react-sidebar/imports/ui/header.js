import React from "react";
import { Column, Row } from 'simple-flexbox';
    
const styles = {
    contentHeaderMenuLink: {
        textDecoration: "none",
        color: "white",
        textAlign: "right"
    }
}

function Header(props) {
    return (
        <Row>
            <Column flexGrow={props.growStart}>
                <div></div>
            </Column>
            <Column flexGrow={1}>
                <span>
                    <a
                        onClick={props.buttonClick}
                        href="#"
                        style={styles.contentHeaderMenuLink}
                    >
                        <i className="fa fa-bars"></i>
                    </a>
                    <span></span>
                </span>
            </Column>
            <Column flexGrow={props.growEnd}>
                <div></div>
            </Column>
        </Row>
    )
}

export default Header