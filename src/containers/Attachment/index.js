import { Badge, Dialog, DialogContent, DialogTitle, IconButton, MuiThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AttachFile, Close } from '@material-ui/icons/';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoBar from '../../components/InfoBar';
import { MuiTheme } from '../../helpers/theme.js';
import { getFilesList } from '../../services/attachmentApi.js';
import AttachmentDetails from './attachmentDetails';

const Container = styled.div`
    text-align: center;
    `

const StyledButton = withStyles({
    root: {
        position: 'absolute',
        top: '0.33em',
        right: '0.33em',
    },
})(IconButton);

const Attachment = (props) => {

    const [fileCounter, setFileCounter] = useState(0);

    const [attachmentDialogState, setAttachmentDialogState] = useState({
        open: false,
    });

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    useEffect(() => {
        getData();
    }, []); 

    const handleOpenAttachmentDialog = () => {
        setAttachmentDialogState({ open: true });
    };

    const handleCloseAttachmentDialog = () => {
        setAttachmentDialogState({ open: false });
        getData();
    };

    const handleOpenInfoBar = (message) => {
        setInfoBarState({ open: true, message: message });
    };

    const handleCloseInfoBar = () => {
        setInfoBarState({ open: false, message: '' });
    };

    const getData = () => {
        getFilesList(props.taskId).then(
            response => {
                setFileCounter(response.data.length);
            },
            error => {
                let resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                if (error.message === 'Network Error') {
                    resMessage = 'Błąd sieci. Spróbuj ponownie później.';
                }
                handleOpenInfoBar(resMessage);
            }
        );
    }

    const AttachmentDialog = (props) => {
        return (
            <div>
                <MuiThemeProvider theme={MuiTheme}>
                    <Dialog open={attachmentDialogState.open} onClose={handleCloseAttachmentDialog} fullWidth={true} maxWidth={'xs'}>
                        <DialogTitle>Załączniki</DialogTitle>
                        <StyledButton onClick={handleCloseAttachmentDialog}>
                            <Close />
                        </StyledButton>
                        <DialogContent>
                            <AttachmentDetails taskId={props.taskId} />
                        </DialogContent>
                    </Dialog>
                </MuiThemeProvider >
            </div>
        )
    }

    return (
        <Container>
            <InfoBar isOpen={infoBarState.open} message={infoBarState.message} handleCloseInfoBar={handleCloseInfoBar} />
            <MuiThemeProvider theme={MuiTheme}>
                <Badge badgeContent={fileCounter} showZero max={99} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} onClick={handleOpenAttachmentDialog}>
                    <AttachFile />
                </Badge>
                <AttachmentDialog taskId={props.taskId}/>
            </MuiThemeProvider>
        </Container>
    )
}

export default Attachment


