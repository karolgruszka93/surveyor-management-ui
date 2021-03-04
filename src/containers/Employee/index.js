import React from 'react'
import styled from 'styled-components'
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Task from './Task'
import SideNavigation from '../Employee/SideNavigation'
import Logo from '../../components/Logo'
import { HorizontalLine } from '../../helpers/theme.js'

const Container = styled.div`
    display: flex;
    @media (max-width: 800px) {
        display: table;
        width: 100%;
    }
    @media (max-width: 420px) {
        display: inline-block;
        max-width: 380px;
    }
    `

const Employee = () => {
    return (
        <div>
            <Logo />
            <HorizontalLine />
            <HashRouter>
                <Container>
                    <SideNavigation />
                    <Redirect to="/task" />
                    <Route path="/task" component={Task} />
                </Container>
            </HashRouter>
            <HorizontalLine />
        </div>
    )
}

export default Employee