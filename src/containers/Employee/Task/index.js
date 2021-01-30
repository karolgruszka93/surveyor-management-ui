import { Divider, Grid, List, ListItem, ListItemText, MuiThemeProvider } from '@material-ui/core';
import { Add, ArrowDropUp, Check, ChevronLeft, ChevronRight, Clear, Delete, Edit, FirstPage, LastPage, SaveAlt, Search } from '@material-ui/icons/';
import MaterialTable from 'material-table';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoBar from '../../../components/InfoBar';
import { MuiTheme } from '../../../helpers/theme.js';
import { DateContext } from '../../../services/dateContext';
import { getTasksEmployee } from '../../../services/taskApi.js';
import { getCurrentUser } from "../../../services/userApi.js";
import Attachment from '../../Attachment';
import Comment from '../../Comment';

const EmptyData = styled.div`
    color: #82848a;
    margin-top: 1.5rem;
    `

const ListDetailDescription = styled.div`
    color: #82848a;
    text-align: center;
    `

const Container = styled.div`
    background: #2b2e39;
    width: 80%;
    border-style: solid;
    border-color: #28DD5E;
    border-width: 0.09em;
    `

const TaskDetailsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0.8em;
    margin-right: 1em;
    margin-bottom: 0.8em;
    `

const Task = () => {

    const [date] = useContext(DateContext);

    const [loadData, setLoadData] = useState(false);

    const [state, setState] = useState({
        data: [],
    });

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    useEffect(() => {
        getData(date);
    }, [date]);

    useEffect(() => {
        if (loadData) {
            getData(date);
        }
    }, [loadData]);

    const handleOpenInfoBar = (message) => {
        setInfoBarState({ open: true, message: message });
    };

    const handleCloseInfoBar = () => {
        setInfoBarState({ open: false, message: '' });
    };

    const getData = (date) => {
        getTasksEmployee(getCurrentUser().id, date.toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })).then(
            response => {
                if (response.data !== "") {
                    const taskTab = response.data.map((task) => {
                        return {
                            id: task.id,
                            customer: task.orders[0].customer,
                            orderType: task.orders[0].orderType.id,
                            orderStatus: task.orders[0].orderStatus.status,
                            equipments: task.equipments,
                            employees: task.users,
                            vehicles: task.vehicles,
                        }
                    });
                    setState({
                        data: taskTab
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

    const DataList = (props) => {
        if (props.data.length === 0) {
            return (
                <EmptyData>Brak danych</EmptyData>
            );
        }
        else {
            return (
                <List >
                    <ListDetailDescription>{props.description}</ListDetailDescription>
                    {
                        props.data.map((value) => {
                            const label = { value };
                            return (
                                <ListItem key={label.value.id}>
                                    {props.listItemComponent(label)}
                                </ListItem>
                            );
                        })
                    }
                </List>
            )
        }
    }

    const EmployeesListItemText = (props) => {
        return (
            < ListItemText id={props.id} primary={`${props.value.firstName} ${props.value.lastName}`} />
        )
    };

    const EquipmentsListItemText = (props) => {
        return (
            < ListItemText id={props.id} primary={`${props.value.name} ${props.value.model}`} />
        )
    };

    const VehiclesListItemText = (props) => {
        return (
            < ListItemText id={props.id} primary={`${props.value.mark} ${props.value.model} ${props.value.licensePlateNumber}`} />
        )
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
                        DetailPanel: ChevronRight
                    }}
                    style={{
                        backgroundColor: '#2b2e39',
                        color: '#FFFFFF',
                    }}
                    title="Zaplanowane zadania"
                    columns={[
                        {
                            title: 'Zlecenie', field: 'orderType', lookup: {
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
                    ]}
                    data={state.data}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'Brak zadań',
                            addTooltip: 'Dodaj',
                            deleteTooltip: 'Usuń',
                            editTooltip: 'Edytuj',
                            filterRow: {
                                filterTooltip: 'Szukaj',
                            },
                            editRow: {
                                deleteText: 'Czy napewno usunąć zadanie?',
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
                        exportButton: false,
                        search: false,
                        actionsColumnIndex: -1,
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                        paginationType: 'stepped',
                        headerStyle: {
                            backgroundColor: '#2b2e39',
                            color: '#FFFFFF',
                        },
                    }}
                    detailPanel={rowData => {
                        return (
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                spacing={1}>
                                <Grid item xs>
                                    <DataList
                                        data={rowData.employees}
                                        listItemComponent={EmployeesListItemText}
                                        description={'Pracownicy:'}
                                    />
                                    <DataList
                                        data={rowData.equipments}
                                        listItemComponent={EquipmentsListItemText}
                                        description={'Sprzęt:'}
                                    />
                                    <DataList
                                        data={rowData.vehicles}
                                        listItemComponent={VehiclesListItemText}
                                        description={'Pojazdy:'}
                                    />
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs >
                                    <TaskDetailsContainer>
                                        <Attachment taskId={rowData.id} />
                                    </TaskDetailsContainer>
                                    <TaskDetailsContainer>
                                        <Comment taskId={rowData.id} />
                                    </TaskDetailsContainer>
                                </Grid>
                            </Grid>
                        )
                    }}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
            </MuiThemeProvider>
        </Container>
    )
}

export default Task