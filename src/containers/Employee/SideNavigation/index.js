import Calendar from 'react-calendar';
import React, { useContext } from 'react'
import styled from "styled-components";
import { IconLogout } from '../../../helpers/fonts.js'
import { Button } from '../../../helpers/theme.js'
import { logoutUser } from "../../../services/userApi.js";
import { DateContext } from '../../../services/dateContext';

const NavContainer = styled.div` 
    background: #2b2e39;
    width: 35%;
    height: 100%;
    color: #808080;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    `

const LogoutButton = styled(Button)`
    margin-top: 0.5em; 
    margin-bottom: 0.5em;
    background: #374550;
    width: 85%;
    `

const handleLogout = () => {
    logoutUser();
    window.location.replace("/");
}

const SideNavigation = () => {

    const [date, setDate] = useContext(DateContext);

    const changeDate = (value) => {
        setDate(value)
    }

    return (
        <NavContainer>
            <Calendar onChange={changeDate} value={date} />
            <LogoutButton onClick={handleLogout} color='#4A5F6D'>Wyloguj<IconLogout /></LogoutButton>
        </NavContainer>
    )
}
export default SideNavigation
