import React from 'react';
import {grey700, grey800, grey100, darkBlack, white} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

export const redMuiTheme = getMuiTheme({
    palette: {
        textColor: darkBlack,
        canvasColor: white,
        primary1Color: "#ED3628",
        accentColor: "#F1AD1D"
    },
    appBar: {
        height: 64,
        //backgroundColor
    },
    drawer: {
        canvasColor: "#F1AD1D"
    }
});

export const orangeMuiTheme = getMuiTheme({
    palette: {
        textColor: darkBlack,
        canvasColor: white,
        primary1Color: "#F1AD1D",
        accentColor: "#ED3628"
    },
    appBar: {
        height: 64,
        //backgroundColor
    },
    drawer: {
        canvasColor: "#F1AD1D"
    }
});

export const darkMuiTheme = getMuiTheme({
    palette: {
        textColor: grey100,
        canvasColor: grey800,
        primary1Color: grey700,
        accent1Color: "#F1AD1D",
    },
    appBar: {
        height: 64,
    }
});