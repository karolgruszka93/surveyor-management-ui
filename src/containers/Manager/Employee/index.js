import { Dialog, DialogContent, DialogTitle, IconButton, MuiThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add, ArrowDropUp, Check, ChevronLeft, ChevronRight, Clear, Close, Delete, Edit, FirstPage, LastPage, SaveAlt, Search } from '@material-ui/icons';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoBar from '../../../components/InfoBar';
import { MuiTheme } from '../../../helpers/theme.js';
import { deleteEmployee, getCurrentUser, getEmployees, updateEmployee } from '../../../services/userApi.js';
import NewEmployeeForm from './newEmployeeForm.js';

const Container = styled.div`
    background: #2b2e39;
    width: 80%;
    border-style: solid;
    border-color: #28DD5E;
    border-width: 0.09em;
    @media (max-width: 800px) {
        display: table;
        width: 100%;
    }
    @media (max-width: 420px) {
        display: inline-block;
        max-width: 380px;
    }
    `

const StyledButton = withStyles({
    root: {
        position: 'absolute',
        top: '0.33em',
        right: '0.33em',
    },
})(IconButton);

const Employee = () => {

    const [state, setState] = useState({
        data: [],
    });

    const [loadData, setLoadData] = useState(false);

    const [dialogState, setDialogState] = useState(false);

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (loadData) {
            getData();
        }
    }, [loadData]);

    const getData = () => {
        getEmployees(getCurrentUser().id).then(
            response => {
                setState({ data: response.data })
                setLoadData(false);
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

    const removeData = (id) => {
        deleteEmployee(id).then(
            response => {
                setLoadData(true);
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

    const updateData = (id, firstName, lastName, email) => {
        updateEmployee(id, firstName, lastName, email).then(
            response => {
                setLoadData(true);
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

    const handleOpenInfoBar = (message) => {
        setInfoBarState({ open: true, message: message });
    };

    const handleCloseInfoBar = () => {
        setInfoBarState({ open: false, message: '' });
    };

    const handleOpenDialog = () => {
        setDialogState(true);
    };

    const handleCloseDialog = () => {
        setDialogState(false);
        setLoadData(true);
    };

    const isDataValid = (newData) => {
        if (!newData.firstName || !(newData.firstName).match(/^[a-zA-Zą-żĄ-Ż ]+$/)) {
            handleOpenInfoBar("Imię jest puste lub zawiera niedozwolone znaki. Nie wprowadzono zmian");
            return false;
        }
        if (newData.firstName.length > 20) {
            handleOpenInfoBar("Imię nie może przekroczyć 20 znaków. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.lastName || !(newData.lastName).match(/^[a-zA-Zą-żĄ-Ż ]+$/)) {
            handleOpenInfoBar("Nazwisko jest puste lub zawiera niedozwolone znaki. Nie wprowadzono zmian");
            return false;
        }
        if (newData.lastName.length > 20) {
            handleOpenInfoBar("Nazwisko nie może przekroczyć 20 znaków. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.email || !(newData.email).match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            handleOpenInfoBar("Błędny adres email. Nie wprowadzono zmian");
            return false;
        }
        if (newData.email.length > 320) {
            handleOpenInfoBar("Email nie może przekroczyć 320 znaków. Nie wprowadzono zmian");
            return false;
        }
        return true;
    };

    const NewEmployeeDialog = () => {
        return (
            <div>
                <MuiThemeProvider theme={MuiTheme}>
                    <Dialog open={dialogState} onClose={handleCloseDialog}>
                        <DialogTitle>Dodaj nowego pracownika</DialogTitle>
                        <StyledButton onClick={handleCloseDialog}>
                            <Close />
                        </StyledButton>
                        <DialogContent>
                            <NewEmployeeForm />
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
                <MaterialTable
                    icons={{
                        Check: Check,
                        Export: SaveAlt,
                        FirstPage: FirstPage,
                        LastPage: LastPage,
                        NextPage: ChevronRight,
                        PreviousPage: ChevronLeft,
                        Search: Search,
                        Add: Add,
                        Delete: Delete,
                        Edit: Edit,
                        Clear: Clear,
                        SortArrow: ArrowDropUp,
                        ResetSearch: Clear,
                    }}
                    style={{
                        backgroundColor: '#2b2e39',
                        color: '#FFFFFF',
                    }}
                    title="Pracownicy"
                    columns={[
                        { title: 'Imię', field: 'firstName' },
                        { title: 'Nazwisko', field: 'lastName' },
                        { title: 'Adres e-mail', field: 'email' },
                    ]}
                    data={state.data}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (oldData && isDataValid(newData)) {
                                        resolve([oldData, newData]);
                                    }
                                    else {
                                        reject();
                                    }
                                }, 600);
                            }).then(([oldData, newData]) => {
                                updateData(oldData.id, newData.firstName, newData.lastName, newData.email);
                            }),
                        onRowDelete: (employee) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (employee) {
                                        resolve(employee);
                                    }
                                    else {
                                        reject();
                                    }
                                }, 600);
                            }).then(employee => {
                                removeData(employee.id);
                            }),
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'Brak pracowników',
                            addTooltip: 'Dodaj',
                            deleteTooltip: 'Usuń',
                            editTooltip: 'Edytuj',
                            filterRow: {
                                filterTooltip: 'Szukaj',
                            },
                            editRow: {
                                deleteText: 'Czy napewno usunąć pracownika?',
                                cancelTooltip: 'Anuluj',
                                saveTooltip: 'Zapisz'
                            }
                        },
                        header: {
                            actions: 'Akcje'
                        },
                        pagination: {
                            labelDisplayedRows: '{from}-{to} do {count}',
                            labelRowsSelect: 'wierszy',
                            labelRowsPerPage: 'Wierszy na stronę:',
                            firstAriaLabel: 'Pierwsza strona',
                            firstTooltip: 'Pierwsza strona',
                            previousAriaLabel: 'Poprzednia strona',
                            previousTooltip: 'Poprzednia strona',
                            nextAriaLabel: 'Następna strona',
                            nextTooltip: 'Następna strona',
                            lastAriaLabel: 'Ostatnia strona',
                            lastTooltip: 'Ostatnia strona'
                        },
                        toolbar: {
                            exportTitle: 'Eksportuj',
                            exportAriaLabel: 'Eksportuj',
                            exportName: 'Eksport jako CSV',
                            searchTooltip: 'Szukaj',
                            searchPlaceholder: 'Szukaj',
                        },
                    }}
                    options={{
                        exportButton: true,
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 30],
                        paginationType: 'stepped',
                        headerStyle: {
                            backgroundColor: '#2b2e39',
                            color: '#FFFFFF',
                        },
                    }}
                    actions={[
                        {
                            icon: Add,
                            tooltip: 'Dodaj',
                            isFreeAction: true,
                            onClick: handleOpenDialog,
                        },
                    ]}
                />
                <NewEmployeeDialog />
            </MuiThemeProvider>
        </Container>
    )
}

export default Employee
