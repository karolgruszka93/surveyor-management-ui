import { Badge, Dialog, DialogTitle, IconButton, List, ListItem, MuiThemeProvider, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AddComment, Close } from '@material-ui/icons/';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoBar from '../../components/InfoBar';
import { MuiTheme } from '../../helpers/theme.js';
import { getComments } from '../../services/commentApi.js';
import NewCommentForm from './newCommentForm';

const Container = styled.div`
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 100%;
    `

const EmptyData = styled.div`
    color: #82848a;
    `

const CommentAuthor = styled.div`
    font-size: 0.8em;
    padding: 0.2em 0.5em 0.2em 0.5em;
    color: #BCBDC2;
    text-align: left;
    grid-column: 1;
    grid-row: 1;
    `

const CommentDate = styled.div`
    font-size: 0.8em;
    padding: 0.2em 0.5em 0.2em 0.5em;
    color: #BCBDC2;
    text-align: right;
    float: right;
    grid-column: 2;
    grid-row: 1;
    `

const CommentValue = styled.div`
    font-size: 0.8em;
    padding: 0.2em 0.5em 0.2em 0.5em;
    text-align: right;
    grid-row: 2;
    grid-column: 1/3;
    max-width: inherit;
    white-space: normal;
    word-break: break-word;
    `

const StyledButton = withStyles({
    root: {
        position: 'absolute',
        top: '0.33em',
        right: '0.33em',
    },
})(IconButton);

const CommentContainer = withStyles({
    root: {
        backgroundColor: '#4A5F6D',
        marginBottom: '0.3em',
        display: 'grid',
        width: '100%',
    },
})(Paper);

const Comment = (props) => {

    const [comments, setComments] = useState([]);

    const [dialogState, setDialogState] = useState({
        open: false,
    });

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    useEffect(() => {
        getData(props.taskId);
    }, []);

    const handleOpenDialog = () => {
        setDialogState({ open: true });
    };

    const handleCloseDialog = () => {
        getData(props.taskId);
        setDialogState({ open: false });
    };

    const handleOpenInfoBar = (message) => {
        setInfoBarState({ open: true, message: message });
    };

    const handleCloseInfoBar = () => {
        setInfoBarState({ open: false, message: '' });
    };

    const getData = (taskId) => {
        getComments(taskId).then(
            response => {
                const commentsTab = response.data.map((comment) => {
                    return {
                        id: comment.id,
                        comment: comment.comment,
                        commentDate: comment.commentDate,
                        userFirstName: comment.user.firstName,
                        userLastName: comment.user.lastName,
                    }
                });
                setComments(commentsTab);
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

    const CommentsList = (props) => {
        if (props.comments.length === 0) {
            return (
                <EmptyData>Brak wiadomości</EmptyData>
            );
        }
        else {
            return (
                <List >
                    {
                        props.comments.map((value) => {
                            return (
                                <ListItem key={value.id}>
                                    <CommentContainer elevation={5}>
                                        <CommentAuthor>{value.userFirstName} {value.userLastName}</CommentAuthor>
                                        <CommentDate>{value.commentDate}</CommentDate>
                                        <CommentValue>{value.comment}</CommentValue>
                                    </CommentContainer>
                                </ListItem>
                            );
                        })
                    }
                </List>
            )
        }
    }

    const NewCommentDialog = () => {
        return (
            <MuiThemeProvider theme={MuiTheme}>
                <Dialog open={dialogState.open} onClose={handleCloseDialog} fullWidth={true} maxWidth={'xs'}>
                    <DialogTitle>Nowy komunikat</DialogTitle>
                    <StyledButton onClick={handleCloseDialog}>
                        <Close />
                    </StyledButton>
                    <NewCommentForm taskId={props.taskId} />
                </Dialog>
            </MuiThemeProvider >
        )
    }

    return (
        <Container>
            <InfoBar isOpen={infoBarState.open} message={infoBarState.message} handleCloseInfoBar={handleCloseInfoBar} />
            <MuiThemeProvider theme={MuiTheme}>
                <Badge onClick={handleOpenDialog} >
                    <AddComment />
                </Badge>
                <CommentsList comments={comments} />
                <NewCommentDialog />
            </MuiThemeProvider>
        </Container>
    )
}

export default Comment