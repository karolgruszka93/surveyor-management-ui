import { DialogContent, MuiThemeProvider, TextField } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import InfoBar from '../../components/InfoBar';
import { IconComment } from '../../helpers/fonts.js';
import { Button, MuiTheme } from '../../helpers/theme.js';
import {createComment} from '../../services/commentApi.js';
import { getCurrentUser} from '../../services/userApi.js';

const Container = styled.div`
    text-align: center;
    `

const CenterButton = styled(Button)`
    display: table;
    margin: 1rem auto;
    `

const NewCommentForm = (props) => {

    const comment = useRef('');

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    const handleOpenInfoBar = (message) => {
        setInfoBarState({ open: true, message: message });
    };

    const handleCloseInfoBar = () => {
        setInfoBarState({ open: false, message: '' });
    };

    const createData = (comment, commentDate, taskId) => {
        const currentUserId = getCurrentUser().id;
        createComment(comment, commentDate.toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' }), taskId, currentUserId).then(
            response => {
                handleOpenInfoBar(response.data.message);
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

    const onSubmit = () => {
        if (comment.current.value.length === 0) {
            handleOpenInfoBar("Komunikat nie może być pusty");
        }
        else {
            createData(comment.current.value, new Date(), props.taskId);
            comment.current.value = "";
        }
    };

    return (
        <Container>
            <MuiThemeProvider theme={MuiTheme}>
                <InfoBar isOpen={infoBarState.open} message={infoBarState.message} handleCloseInfoBar={handleCloseInfoBar} />
                <DialogContent>
                    <TextField
                        inputRef={comment}
                        id="newComment"
                        label="Maksymalnie 160 znaków"
                        multiline
                        rows={7}
                        rowsMax={7}
                        variant="filled"
                        fullWidth="true"
                        required="true"
                        inputProps={{ maxLength: 160 }}
                    />
                    <CenterButton onClick={onSubmit} color='#4A5F6D'>Zapisz komunikat<IconComment /></CenterButton>
                </DialogContent>
            </MuiThemeProvider>
        </Container>
    )

}

export default NewCommentForm