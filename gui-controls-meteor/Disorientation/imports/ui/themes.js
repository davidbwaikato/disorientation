import React from 'react';
import { grey700, grey800, grey600, grey100, darkBlack, white, yellow } from 'material-ui/styles/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const redMuiTheme = getMuiTheme({
    palette: {
        textColor: darkBlack,
        canvasColor: white,
        primary1Color: "#ED3628",
        accentColor: "#F1AD1D"
    },
});

export const orangeMuiTheme = getMuiTheme({
    palette: {
        textColor: darkBlack,
        canvasColor: white,
        primary1Color: "#F1AD1D",
        accentColor: "#ED3628"
    },
});

export const darkMuiTheme = getMuiTheme({
    palette: {
        textColor: white,
        canvasColor: grey800,
        primary1Color: grey700,
        accentColor: "#F1AD1D",
    },

});
