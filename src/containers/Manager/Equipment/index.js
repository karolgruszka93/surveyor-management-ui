import { MuiThemeProvider } from "@material-ui/core";
import { Add, ArrowDropUp, Check, ChevronLeft, ChevronRight, Clear, Delete, Edit, FirstPage, LastPage, SaveAlt, Search } from '@material-ui/icons';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoBar from '../../../components/InfoBar';
import { MuiTheme } from '../../../helpers/theme.js';
import { createEquipment, deleteEquipment, getEquipment, updateEquipment } from '../../../services/equipmentApi.js';
import { getCurrentUser } from "../../../services/userApi.js";

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

const Equipment = () => {

    const [state, setState] = useState({
        data: []
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

    const createData = (name, model, type) => {
        const currentUserId = getCurrentUser().id;
        createEquipment(name, model, type, currentUserId).then(
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
        getEquipment(getCurrentUser().id).then(
            response => {
                if (response.data.length !== 0) {
                    const equipmentTab = response.data.map((equipment) => {
                        return {
                            name: equipment.name,
                            model: equipment.model,
                            type: equipment.equipmentType.id,
                            id: equipment.id
                        }
                    });
                    setState({
                        data: equipmentTab
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
        deleteEquipment(id).then(
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

    const updateData = (id, name, model, type) => {
        updateEquipment(id, name, model, type).then(
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
        if (!newData.name) {
            handleOpenInfoBar("Nazwa sprzętu nie może być pusta. Nie wprowadzono zmian");
            return false;
        }
        if (newData.name.length > 255) {
            handleOpenInfoBar("Nazwa sprzętu nie może przekroczyć 255 znaków. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.model) {
            handleOpenInfoBar("Nazwa modelu nie może być pusta. Nie wprowadzono zmian");
            return false;
        }
        if (newData.model.length > 255) {
            handleOpenInfoBar("Nazwa modelu nie może przekroczyć 255 znaków. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.type) {
            handleOpenInfoBar("Rodzaj sprzętu nie może być pusty. Nie wprowadzono zmian");
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
                    title="Sprzęt"
                    columns={[
                        { title: 'Nazwa', field: 'name' },
                        { title: 'Model', field: 'model' },
                        {
                            title: 'Rodzaj', field: 'type', lookup: {
                                1: 'Tachimetr',
                                2: 'Niwelator',
                                3: 'Zestaw GPS',
                                4: 'Łata niwelacyjna',
                                5: 'Pion',
                                6: 'Taśma geodezyjna',
                                7: 'Szkicownik',
                                8: 'Szpilka',
                                9: 'Tyczka',
                                10: 'Żabka niwelacyjna',
                                11: 'Zestaw UAV',
                                12: 'Skaner laserowy',
                                13: 'Georadar',
                                14: 'Pozostałe',
                            },
                        },
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
                                createData(newData.name, newData.model, newData.type)
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
                                updateData(oldData.id, newData.name, newData.model, newData.type);
                            }),
                        onRowDelete: (equipment) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (equipment) {
                                        resolve(equipment);
                                    }
                                    else {
                                        reject();
                                    }
                                }, 600);
                            }).then(equipment => {
                                removeData(equipment.id);
                            }),
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'Brak sprzętu',
                            addTooltip: 'Dodaj',
                            deleteTooltip: 'Usuń',
                            editTooltip: 'Edytuj',
                            filterRow: {
                                filterTooltip: 'Szukaj',
                            },
                            editRow: {
                                deleteText: 'Czy napewno usunąć sprzęt?',
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

export default Equipment 
