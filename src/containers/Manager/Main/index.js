import { Divider } from '@material-ui/core';
import React, { useContext } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { DateContext } from '../../../services/dateContext';
import DateDetails from './dateDetails';
import { withStyles } from '@material-ui/core/styles';

const Container = styled.div`
    background: #2b2e39;
    width: 80%;
    border-style: solid;
    border-color: #28DD5E;
    border-width: 0.09em;
    display: grid;
    grid-template-columns: 40% 60%;
    `

const CalendarContainer = styled.div`
    border-right-style: solid;
    border-right-color: #28DD5E;
    border-right-width: 0.09em;
    `

const StyledDivider = withStyles({
    root: {
        backgroundColor: '#82848a',
    },
})(Divider);

const DateDetailsContainer = styled.div`
    `

const Main = () => {
    const [date, setDate] = useContext(DateContext);

    const changeDate = (value) => {
        setDate(value)
    }

    return (
        <Container>
            <CalendarContainer>
                <Calendar onChange={changeDate} value={date} />
                <StyledDivider variant="middle" />
            </CalendarContainer>
            <DateDetailsContainer>
                <DateDetails />
            </DateDetailsContainer>
        </Container>
    )
}

export default Main
