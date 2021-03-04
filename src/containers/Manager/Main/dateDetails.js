import { MuiThemeProvider } from '@material-ui/core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import InfoBar from '../../../components/InfoBar';
import { MuiTheme } from '../../../helpers/theme.js';
import { DateContext } from '../../../services/dateContext';
import Task from '../Task/index';

const DayTitle = styled.div`
    font-size: 3em;
    @media (max-width: 800px) {
        display: none;
    }
    `

const MonthTitle = styled.div`
    margin-top: -0.5em;
    font-size: 1.5em;
    @media (max-width: 800px) {
        display: none;
    }
    `

const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec',
    'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];


const DateDetails = () => {

    const [date] = useContext(DateContext);

    return (
        <MuiThemeProvider theme={MuiTheme}>
            <InfoBar />
            <DayTitle> {date.getDate()}</DayTitle >
            <MonthTitle>{months[date.getMonth()]}</MonthTitle>
            <Task />
        </MuiThemeProvider>
    )
}

export default DateDetails

