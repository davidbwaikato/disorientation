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
    appBar: {
        height: 64,
        //backgroundColor
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
        primary: {
            main: grey700,
           
        }

    },

});

export const callumMuiTheme = getMuiTheme({
    palette: {
        textColor: "#FF0000",
        shadowColor: "#00FF21",
        accent1Color: "#FF006E",
        accent2Color: "#7F0000",
        accent3Color: "#B200FF",
        borderColor: "#00FF00",
        alternateTextColor: "#0000FF",
        secondaryTextColor: "#ABCDEF",
        pickerHeaderColor: "pink",
        canvasColor: "#FFD800",
        primary1Color: "#00FFFF",
        accentColor: "#303030",
    },
    fontFamily: "andy",
    isRtl: true,


});