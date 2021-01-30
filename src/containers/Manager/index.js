import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import { HorizontalLine } from '../../helpers/theme.js';
import SideNavigation from '../Manager/SideNavigation';
import Employee from './Employee';
import Equipment from './Equipment';
import Main from './Main';
import Order from './Order';
import Vehicle from './Vehicle';

const Container = styled.div`
    display: flex;
    `

const Manager = () => {
    return (
        <div>
            <Logo />
            <HorizontalLine />
            <HashRouter>
                <Container>
                    <SideNavigation />
                    <Redirect to="/main" />
                    <Route path="/main" component={Main} />
                    <Route path="/employee" component={Employee} />
                    <Route path="/order" component={Order} />
                    <Route path="/equipment" component={Equipment} />
                    <Route path="/vehicle" component={Vehicle} />
                </Container>
            </HashRouter>
            <HorizontalLine />
        </div>
    )
}

export default Manager