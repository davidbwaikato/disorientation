import React from 'react';
import {grey800, grey50, grey100, darkBlack, white} from 'material-ui/styles/colors';
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
});

export const darkMuiTheme = getMuiTheme({
    palette: {
        textColor: grey100,
        canvasColor: grey800,
        primary1Color: "#ED3628",
        accentColor: "#F1AD1D"
    },
    appBar: {
        height: 300,
    },
});