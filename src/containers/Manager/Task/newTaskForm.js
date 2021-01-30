import { Checkbox, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, MuiThemeProvider } from "@material-ui/core";
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import InfoBar from '../../../components/InfoBar';
import { IconUserPlus } from '../../../helpers/fonts.js';
import { Button, MuiTheme } from '../../../helpers/theme.js';
import { getEquipment } from '../../../services/equipmentApi.js';
import { getOrders } from '../../../services/orderApi.js';
import { createTask } from '../../../services/taskApi.js';
import { getCurrentUser, getEmployees } from '../../../services/userApi.js';
import { getVehicles } from '../../../services/vehicleApi.js';
import { DateContext } from '../../../services/dateContext';

const Container = styled.div`
    text-align: center;
    `

const CenterButton = styled(Button)`
    display: table;
    margin: 0.2rem auto;
    `

const EmptyData = styled.div`
    color: #82848a;
    margin-top: 1.5rem;
    `

const orderTypes = ['Podział nieruchomości', 'Scalenie i podział nieruchomości', 'Projekt scalenia gruntów',
    'Projekt wymiany gruntów', 'Inna mapa do celów prawnych', 'Rozgraniczenie nieruchomości', 'Wznowienie znaków granicznych',
    'Wyznacznie punktów granicznych', 'Ustalenie przebiegu granic', 'Mapa do celów projektowych', 'Inwentaryzacja obiektów budowlanych', 'Inny cel'];

const equTypes = ['Tachimetr', 'Niwelator', 'Zestaw GPS', 'Łata niwelacyjna', 'Pion', 'Taśma geodezyjna', 'Szkicownik',
    'Szpilka', 'Tyczka', 'Żabka niwelacyjna', 'Zestaw UAV', 'Skaner laserowy', 'Georadar', 'Pozostałe'];

const NewTaskForm = () => {

    const [date] = useContext(DateContext);

    const [employees, setEmployees] = useState([]);
    const [orders, setOrders] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [checkedEmployees, setCheckedEmployees] = useState([]);
    const [checkedOrders, setCheckedOrders] = useState([]);
    const [checkedEquipments, setCheckedEquipments] = useState([]);
    const [checkedVehicles, setCheckedVehicles] = useState([]);

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    useEffect(() => {
        getData();
    }, []); 

    useEffect(() => { }, [employees, orders, equipments, vehicles]);

    const handleOpenInfoBar = (message) => {
        setInfoBarState({ open: true, message: message });
    };

    const handleCloseInfoBar = () => {
        setInfoBarState({ open: false, message: '' });
    };

    const createData = (employees, orders, equipments, vehicles) => {
        const currentUserId = getCurrentUser().id;
        createTask(employees, orders, equipments, vehicles, date.toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' }), currentUserId).then(
            response => {
                handleOpenInfoBar(response.data.message);
                setCheckedEmployees([]);
                setCheckedOrders([]);
                setCheckedEquipments([]);
                setCheckedVehicles([]);
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

        getEmployees(getCurrentUser().id).then(
            response => {
                if (response.data.length !== 0) {
                    setEmployees(response.data);
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
                    setOrders(ordersTab);
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

        getEquipment(getCurrentUser().id).then(
            response => {
                if (response.data.length !== 0) {
                    const equipmentsTab = response.data.map((equipment) => {
                        return {
                            name: equipment.name,
                            model: equipment.model,
                            type: equipment.equipmentType.id,
                            id: equipment.id
                        }
                    });
                    setEquipments(equipmentsTab);
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

        getVehicles(getCurrentUser().id).then(
            response => {
                if (response.data.length !== 0) {
                    const vehiclesTab = response.data.map((vehicle) => {
                        return {
                            mark: vehicle.mark,
                            model: vehicle.model,
                            licensePlateNumber: vehicle.licensePlateNumber,
                            serviceDate: vehicle.serviceDate,
                            id: vehicle.id,
                        }
                    });
                    setVehicles(vehiclesTab);
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

    const onSubmit = () => {
        if ((checkedOrders.length !== 0) && (checkedEmployees.length !== 0)) {
            if (checkedOrders.length === 1) {
                createData(checkedEmployees, checkedOrders, checkedEquipments, checkedVehicles);
            }
            else {
                handleOpenInfoBar("Wybierz dokładnie jedno zlecenie");
            }
        }
        else {
            handleOpenInfoBar("Wybierz co najmniej jednego pracownika oraz dokładnie jedno zlecenie");
        }
    };

    const handleToggleEmployees = (value) => () => {
        const currentIndex = checkedEmployees.indexOf(value);
        const newCheckedEmployees = [...checkedEmployees];

        if (currentIndex === -1) {
            newCheckedEmployees.push(value);
        } else {
            newCheckedEmployees.splice(currentIndex, 1);
        }
        setCheckedEmployees(newCheckedEmployees);
    };

    const handleToggleOrders = (value) => () => {
        const currentIndex = checkedOrders.indexOf(value);
        const newCheckedOrders = [...checkedOrders];

        if (currentIndex === -1) {
            newCheckedOrders.push(value);
        } else {
            newCheckedOrders.splice(currentIndex, 1);
        }
        setCheckedOrders(newCheckedOrders);
    };

    const handleToggleEquipments = (value) => () => {
        const currentIndex = checkedEquipments.indexOf(value);
        const newCheckedEquipments = [...checkedEquipments];

        if (currentIndex === -1) {
            newCheckedEquipments.push(value);
        } else {
            newCheckedEquipments.splice(currentIndex, 1);
        }
        setCheckedEquipments(newCheckedEquipments);
    };

    const handleToggleVehicles = (value) => () => {
        const currentIndex = checkedVehicles.indexOf(value);
        const newCheckedVehicles = [...checkedVehicles];

        if (currentIndex === -1) {
            newCheckedVehicles.push(value);
        } else {
            newCheckedVehicles.splice(currentIndex, 1);
        }
        setCheckedVehicles(newCheckedVehicles);
    };

    const EmployeeListItemText = (props) => {
        return (
            <ListItemText id={props.label} primary={`${props.value.firstName} ${props.value.lastName}`} />
        )
    };

    const OrderListItemText = (props) => {
        return (
            <ListItemText id={props.label} primary={`${orderTypes[props.value.type - 1]} ${props.value.customer}`} />
        )
    };

    const EquipmentListItemText = (props) => {
        return (
            <ListItemText id={props.label} primary={`${equTypes[props.value.type - 1]} ${props.value.name} ${props.value.model}`} />
        )
    };

    const VehicleListItemText = (props) => {
        return (
            <ListItemText id={props.label} primary={`${props.value.mark} ${props.value.model} ${props.value.licensePlateNumber}`} />
        )
    };

    const DataList = (props) => {
        if (props.data.length === 0) {
            return (
                <EmptyData>Brak danych</EmptyData>
            );
        }
        else {
            return (
                <List >
                    {
                        props.data.map((value) => {
                            const label = { value };
                            return (
                                <ListItem key={label.value.id} dense button onClick={props.handleToggle(value)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={props.checkedData.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ label }}
                                        />
                                    </ListItemIcon>
                                    {props.listItemComponent(label)}
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
                <form autoComplete='off'>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        spacing={1}>
                        <Grid item xs>
                            <div>Wybierz pracowników:</div>
                            <DataList
                                data={employees}
                                checkedData={checkedEmployees}
                                handleToggle={handleToggleEmployees}
                                listItemComponent={EmployeeListItemText}
                            />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs>
                            <div>Wybierz zlecenie:</div>
                            <DataList
                                data={orders}
                                checkedData={checkedOrders}
                                handleToggle={handleToggleOrders}
                                listItemComponent={OrderListItemText}
                            />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs>
                            <div> Wybierz sprzęt:</div>
                            <DataList
                                data={equipments}
                                checkedData={checkedEquipments}
                                handleToggle={handleToggleEquipments}
                                listItemComponent={EquipmentListItemText}
                            />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs>
                            <div> Wybierz pojazd:</div>
                            <DataList
                                data={vehicles}
                                checkedData={checkedVehicles}
                                handleToggle={handleToggleVehicles}
                                listItemComponent={VehicleListItemText}
                            />
                        </Grid>
                    </Grid>
                    <CenterButton onClick={onSubmit} color='#4A5F6D'>Dodaj zadanie<IconUserPlus /></CenterButton>
                </form>
            </MuiThemeProvider>
        </Container>
    )
}

export default NewTaskForm
