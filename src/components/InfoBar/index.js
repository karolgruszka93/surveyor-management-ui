import React from 'react'
import { MuiThemeProvider } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import { MuiTheme } from '../../helpers/theme.js';

const InfoBar = (props) => {
    return (
        <div>
            <MuiThemeProvider theme={MuiTheme}>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={props.isOpen}
                    autoHideDuration={5000}
                    onClose={props.handleCloseInfoBar}
                    message={props.message}
                />
            </MuiThemeProvider >
        </div>
    );
}

export default InfoBar