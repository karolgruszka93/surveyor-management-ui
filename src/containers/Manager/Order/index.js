import { MuiThemeProvider } from "@material-ui/core";
import { Add, ArrowDropUp, Check, ChevronLeft, ChevronRight, Clear, Delete, Edit, ExpandMore, FirstPage, LastPage, SaveAlt, Search } from '@material-ui/icons';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoBar from '../../../components/InfoBar';
import { MuiTheme } from '../../../helpers/theme.js';
import { createOrder, deleteOrder, getOrders, updateOrder } from '../../../services/orderApi.js';
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

const Order = () => {

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

    const createData = (type, customer, endDate, status) => {
        const currentUserId = getCurrentUser().id;
        createOrder(type, customer, endDate.toISOString().substring(0, 10), status, currentUserId).then(
            response => {
                handleOpenInfoBar(response.message);
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
        getOrders(getCurrentUser().id).then(
            response => {
                if (response.data.length !== 0) {
                    const ordersTab = response.data.map((order) => {
                        return {
                            type: order.orderType.id,
                            customer: order.customer,
                            endDate: order.endDate,
                            status: order.orderStatus.id,
                            id: order.id
                        }
                    });
                    setState({
                        data: ordersTab
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
        deleteOrder(id).then(
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

    const updateData = (id, type, customer, endDate, status) => {
        updateOrder(id, type, customer, endDate, status).then(
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
        if (!newData.type) {
            handleOpenInfoBar("Rodzaj pracy nie może być pusty. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.customer) {
            handleOpenInfoBar("Nazwa zleceniodawcy nie może być pusta. Nie wprowadzono zmian");
            return false;
        }
        if (newData.customer.length > 255) {
            handleOpenInfoBar("Nazwa zleceniodawcy nie może przekroczyć 255 znaków. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.endDate) {
            handleOpenInfoBar("Data nie może byc pusta. Nie wprowadzono zmian");
            return false;
        }
        if (!newData.status) {
            handleOpenInfoBar("Status zlecenia nie może być pusty. Nie wprowadzono zmian");
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
                        DetailPanel: ExpandMore,
                    }}
                    style={{
                        backgroundColor: '#2b2e39',
                        color: '#FFFFFF',
                    }}
                    title="Zlecenia"
                    columns={[
                        {
                            title: 'Rodzaj pracy', field: 'type', lookup: {
                                1: 'Podział nieruchomości',
                                2: 'Scalenie i podział nieruchomości',
                                3: 'Projekt scalenia gruntów',
                                4: 'Projekt wymiany gruntów',
                                5: 'Inna mapa do celów prawnych',
                                6: 'Rozgraniczenie nieruchomości',
                                7: 'Wznowienie znaków granicznych',
                                8: 'Wyznaczenie punktów granicznych',
                                9: 'Ustalenie przebiegu granic',
                                10: 'Mapa do celów projektowych',
                                11: 'Inwentaryzacja obiektów bud.',
                                12: 'Inny cel',
                            },
                        },
                        { title: 'Zleceniodawca', field: 'customer' },
                        { title: 'Planowana data zakończenia', field: 'endDate', type: 'date' },
                        {
                            title: 'Status', field: 'status', lookup: {
                                1: 'Przyjęcie zlecenia',
                                2: 'Przygotowywanie danych',
                                3: 'Realizacja pomiarów',
                                4: 'Opracowywanie pomiarów',
                                5: 'Kontrola',
                                6: 'Zakończenie zlecenia',
                            },
                        }]
                    }
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
                                createData(newData.type, newData.customer, newData.endDate, newData.status);
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
                                updateData(oldData.id, newData.type, newData.customer, newData.endDate, newData.status);
                            }),
                        onRowDelete: (order) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (order) {
                                        resolve(order);
                                    }
                                    else {
                                        reject();
                                    }
                                }, 600);
                            }).then(order => {
                                removeData(order.id);
                            }),
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'Brak zleceń',
                            addTooltip: 'Dodaj',
                            deleteTooltip: 'Usuń',
                            editTooltip: 'Edytuj',
                            filterRow: {
                                filterTooltip: 'Szukaj',
                            },
                            editRow: {
                                deleteText: 'Czy napewno usunąć zlecenie?',
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

export default Order
