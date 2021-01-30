import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import About from './containers/About'
import Employee from './containers/Employee'
import Login from './containers/Login'
import Manager from './containers/Manager'
import Register from './containers/Register'
import Root from './containers/Root'
import { getCurrentUser } from "./services/userApi.js";
import { DateProvider } from './services/dateContext'

const Container = styled.div`
    background: #2b2e39;
    margin: 0 auto;
    width: 80%;
    max-width: 75em;
    padding: 0.9em;
    border-radius: 0.9em;
    margin-top: 0.9em;
    text-align: center;    
    `

const ManagerRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            getCurrentUser() ? (getCurrentUser().roles[0] === 'ROLE_MANAGER' ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login' }} />)) : (<Redirect to={{ pathname: '/login' }} />)
        }
    />
)

const EmployeeRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            getCurrentUser() ? (getCurrentUser().roles[0] === 'ROLE_EMPLOYEE' ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login' }} />)) : (<Redirect to={{ pathname: '/login' }} />)
        }
    />
)

class App extends Component {

    render() {
        return (
            <DateProvider>
                <Router>
                    <Container>
                        <Switch>
                            <Route exact path='/' component={Root} />
                            <Route exact path='/login' component={Login} />
                            <ManagerRoute exact path='/manager' component={Manager} />
                            <EmployeeRoute exact path='/employee' component={Employee} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/about' component={About} />
                            <Route component={NotFound} />
                        </Switch>
                        <Footer />
                    </Container>
                </Router>
            </DateProvider>
        );
    }
}

export default App;

