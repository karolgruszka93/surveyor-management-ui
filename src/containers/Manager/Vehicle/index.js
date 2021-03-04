import { MuiThemeProvider } from "@material-ui/core";
import { Add, ArrowDropUp, Check, ChevronLeft, ChevronRight, Clear, Delete, Edit, FirstPage, LastPage, SaveAlt, Search } from '@material-ui/icons/';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoBar from '../../../components/InfoBar';
import { MuiTheme } from '../../../helpers/theme.js';
import { getCurrentUser } from "../../../services/userApi.js";
import { createVehicle, deleteVehicle, getVehicles, updateVehicle } from '../../../services/vehicleApi.js';

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

const Vehicle = () => {

    const [state, setState] = useState({
        data: [],
    });

    const [loadData, setLoadData] = useState(false);

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

    const createData = (mark, model, licensePlateNumber, serviceDate) => {
        const currentUserId = getCurrentUser().id;
        createVehicle(mark, model, licensePlateNumber, serviceDate, currentUserId).then(
            response => {
                handleOpenInfoBar(response.data.message);
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

    const getData = () => {
        getVehicles(getCurrentUser().id).then(
            response => {
                if (response.data.length !== 0) {
                    const vehicleTab = response.data.map((vehicle) => {
                        return {
                            mark: vehicle.mark,
                            model: vehicle.model,
                            licensePlateNumber: vehicle.licensePlateNumber,
                            serviceDate: vehicle.serviceDate,
                            id: vehicle.id,
                        }
                    });
                    setState({
                        data: vehicleTab
                    })
                    setLoadData(false);
                }
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
        deleteVehicle(id).then(
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

    const updateData = (id, mark, model, licensePlateNumber, serviceDate) => {
        updateVehicle(id, mark, model, licensePlateNumber, serviceDate).then(
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

    const isDataValid = (newData) => {
        if (!newData.mark) {
            handleOpenInfoBar("Marka pojazdu nie może być pusta. Nie wprowadzono zmian");
            return false;
        }
        if (newData.mark.length > 255) {
            handleOpenInfoBar("Marka pojazdu nie może przekroczyć 255 znaków. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.model) {
            handleOpenInfoBar("Model pojazdu nie może być pusta. Nie wprowadzono zmian");
            return false;
        }
        if (newData.model.length > 255) {
            handleOpenInfoBar("Model pojazdu nie może przekroczyć 255 znaków. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.licensePlateNumber) {
            handleOpenInfoBar("Numer rejestracyjny nie może być pusty. Nie wprowadzono zmian");
            return false;
        }
        if (newData.licensePlateNumber.length > 8) {
            handleOpenInfoBar("Numer rejestracyjny nie może przekroczyć 8 znaków. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.serviceDate) {
            handleOpenInfoBar("Data przeglądu nie może być pusta. Nie wprowadzono zmian");
            return false;
        }
        return true;
    };

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
                    title="Pojazd"
                    columns={[
                        { title: 'Marka', field: 'mark' },
                        { title: 'Model', field: 'model' },
                        { title: 'Numer rejestracyjny', field: 'licensePlateNumber' },
                        { title: 'Data przeglądu', field: 'serviceDate', type: 'date' },
                    ]}
                    data={state.data}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (newData && isDataValid(newData)) {
                                        resolve(newData);
                                    }
                                    else {
                                        reject();
                                    }
                                }, 600);
                            }).then(newData => {
                                createData(newData.mark, newData.model, newData.licensePlateNumber, newData.serviceDate);
                            }),
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
                                updateData(oldData.id, newData.mark, newData.model, newData.licensePlateNumber, newData.serviceDate);
                            }),
                        onRowDelete: (vehicle) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (vehicle) {
                                        resolve(vehicle);
                                    }
                                    else {
                                        reject();
                                    }
                                }, 600);
                            }).then(vehicle => {
                                removeData(vehicle.id);
                            }),
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'Brak pojazdów',
                            addTooltip: 'Dodaj',
                            deleteTooltip: 'Usuń',
                            editTooltip: 'Edytuj',
                            filterRow: {
                                filterTooltip: 'Szukaj',
                            },
                            editRow: {
                                deleteText: 'Czy napewno usunąć pojazd?',
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
                />
            </MuiThemeProvider>
        </Container>
    )
}

export default Vehicle
