import { Divider, Grid, List, ListItem, MuiThemeProvider } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InfoBar from '../../components/InfoBar';
import { IconAttach, IconUpload } from '../../helpers/fonts.js';
import { Button, MuiTheme } from '../../helpers/theme.js';
import { createAttachment, getFilesList, getFile, getDownloadToken } from '../../services/attachmentApi.js';

const Container = styled.div`
    text-align: center;
    `

const CenterButton = styled(Button)`
    display: table;
    `

const Input = styled.input`
    display: none;
    `

const FileName = styled.div`
    font-size: 0.8em;
    color: #BCBDC2;
    text-align: center;
    word-wrap: break-word;
    `

const EmptyData = styled.div`
    color: #82848a;
    padding: 0.1em 0.8em 0.1em 0.8em;
    `

const FileSizeInfo = styled.div`
    color: #82848a;
    font-size: 0.7em;
    `

const FileValue = styled.div`
    font-size: 0.8em;
    padding: 0.1em 0.8em 0.1em 0.8em;
    max-width: inherit;
    white-space: normal;
    word-break: break-word;
    margin-left: auto; 
	margin-right: auto; 
    cursor: default;
    &:hover {
        color: #28DD5E;
        transition: all 0.3s ease 0s;
        cursor: pointer;
    }
    `

const AttachmentDetails = (props) => {

    const fileInput = useRef(null);

    const [filesList, setFilesList] = useState([]);

    const [file, setFile] = useState({
        name: 'Nie wybrano pliku',
        content: null,
    });

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => { }, [filesList]);

    const handleOpenInfoBar = (message) => {
        setInfoBarState({ open: true, message: message });
    };

    const handleCloseInfoBar = () => {
        setInfoBarState({ open: false, message: '' });
    };

    const createData = (file, taskId) => {
        createAttachment(file, taskId).then(
            response => {
                handleOpenInfoBar(response.data.message);
                getData();
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

    const getData = () => {
        getFilesList(props.taskId).then(
            response => {
                const filesTab = response.data.map((file) => {
                    return {
                        id: file.id,
                        location: file.location,
                    }
                });
                setFilesList(filesTab);
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

    const downloadFile = (fileId) => {
        let token = null;
        getDownloadToken(fileId).then(response => {
            token = response.data;
            return token;
        }).then(response => {
            getFile(fileId, response).then(response => {
                window.open(response.config.url, "_self")
            },
                error => {
                    let resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    if (error.message === 'Network Error') {
                        resMessage = 'Błąd sieci. Spróbuj ponownie później.';
                    }
                    handleOpenInfoBar(resMessage);
                });
        })
    }

    const changeFile = (e) => {
        const fileName = fileInput.current.value;
        if (fileName === '') {
            setFile({ name: 'Nie wybrano pliku', content: null });
        }
        else {
            setFile({ name: fileName.replace(/C:\\fakepath\\/, ''), content: e.target.files[0] });
        }
    };

    const onSubmit = () => {
        if (file.content == null) {
            handleOpenInfoBar("Nie wybrano pliku");
        }
        else {
            if (file.content.size > 10000000) {
                handleOpenInfoBar("Plik jest zbyt duży");
            }
            else {
                createData(file.content, props.taskId);
                setFile({ name: 'Nie wybrano pliku', content: null });
            }
        }
    };

    const AttachmentsList = (props) => {
        if (props.files.length === 0) {
            return (
                <EmptyData>Brak załączników</EmptyData>
            );
        }
        else {
            return (
                <List >
                    {
                        props.files.map((value) => {
                            return (
                                <ListItem key={value.id}>
                                    <FileValue onClick={() => downloadFile(value.id)}>{value.location.substring(20)}</FileValue>
                                </ListItem>
                            );
                        })
                    }
                </List>
            )
        }
    }

    return (
        <Container>
            <MuiThemeProvider theme={MuiTheme}>
                <InfoBar isOpen={infoBarState.open} message={infoBarState.message} handleCloseInfoBar={handleCloseInfoBar} />
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={1}>
                    <Grid item xs>
                        <Input id="upload-file" type="file" ref={fileInput} onChange={changeFile} />
                        <label htmlFor="upload-file">
                            <CenterButton color='#4A5F6D'>Wybierz plik <IconAttach /></CenterButton>
                            <FileSizeInfo>maksymalnie 10 MB*</FileSizeInfo>
                        </label>
                    </Grid>
                    <Grid item xs>
                        <FileName>{file.name}</FileName>
                    </Grid>
                    <Grid item xs>
                        <CenterButton color='#4A5F6D' onClick={onSubmit}>Wyślij plik<IconUpload /></CenterButton>
                    </Grid>
                    <Grid item xs >
                        <Divider variant="fullWidth" orientation="horizonal" />
                        <AttachmentsList files={filesList} />
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        </Container>
    )
}

export default AttachmentDetails