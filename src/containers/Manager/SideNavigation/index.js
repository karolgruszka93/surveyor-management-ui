import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavContext, SideNav } from "react-sidenav";
import styled from "styled-components";
import { IconDesktop, IconEmployee, IconLogout, IconOrder, IconPin, IconTruck } from '../../../helpers/fonts.js';
import { Button } from '../../../helpers/theme.js';
import { logoutUser } from "../../../services/userApi.js";

const NavContainer = styled.div` 
    background: #374550;
    width: 20%;
    height: 100%;
    color: #808080;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    @media (max-width: 800px) {
        position: static;
        display: table;
        width: 100%;
    }
    @media (max-width: 420px) {
        display: inline-block;
        max-width: 380px;
    }
    `

const NavTitle = styled.div`
    padding: 0.6em;
    font-size: 1em;
    color: white;
    @media (max-width: 800px) {
        display: none;
    }
    `

const FlexContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5em 0.75em;
    color: ${props => (props.selected ? "#FFF" : "#808080")};
    cursor: default;
    transition: all 0.3s ease-in-out;
    background: ${props => (props.selected ? "#28DD5E" : "inherit")};
    &:hover {
        background: #28DD5E;
    }
    `

const IconContainer = styled.div`
    color: ${props => (props.selected ? "#FFF" : "#808080")};
    line-height: 1em;
    `

const TextContainer = styled.div`
    padding-left: 0.375em;
    line-height: 1.375em;
    `

const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    `

const LogoutButton = styled(Button)`
    background: #374550;
    width: 85%;
    `

const handleLogout = () => {
    logoutUser();
    window.location.replace("/");
}

const NavItem = props => {
    const context = React.useContext(NavContext);

    return (
        <FlexContainer selected={context.selected}>
            <IconContainer selected={context.selected}>{props.icon}</IconContainer>
            <TextContainer>{props.title}</TextContainer>
        </FlexContainer>
    );
}

const SideNavigation = () => {
    return (
        <NavContainer>
            <NavTitle>Menu</NavTitle>
            <SideNav defaultSelectedPath={'1'}>
                <Nav id="1">
                    <StyledLink to='/main'>
                        <NavItem icon={<IconDesktop />} title={"Pulpit"} />
                    </StyledLink>
                </Nav>
                <Nav id="2">
                    <StyledLink to='/employee'>
                        <NavItem icon={<IconEmployee />} title={"Pracownik"} />
                    </StyledLink>
                </Nav>
                <Nav id="3">
                    <StyledLink to='/order'>
                        <NavItem icon={<IconOrder />} title={"Zlecenie"} />
                    </StyledLink>
                </Nav>
                <Nav id="4">
                    <StyledLink to='/equipment'>
                        <NavItem icon={<IconPin />} title={"Sprzęt"} />
                    </StyledLink>
                </Nav>
                <Nav id="5">
                    <StyledLink to='/vehicle'>
                        <NavItem icon={<IconTruck />} title={"Pojazd"} />
                    </StyledLink>
                </Nav>
            </SideNav>
            <LogoutButton onClick={handleLogout} color='#4A5F6D'>Wyloguj<IconLogout /></LogoutButton>
        </NavContainer>
    )
}
export default SideNavigation
