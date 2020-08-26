import React from 'react';
import { Router, Switch, Route } from 'react-router';

import {history} from './services/history';

import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import NotFoundPage from './Components/NotFoundPage';
import PrivateRoute from './PrivateRoute'
import HostPage from './Pages/HostPage';
import FilteredPage from './Pages/FilteredPage';
import DashboardPage from './Pages/DashboardPage';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={HomePage}/>
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/host/:id" component={HostPage}/>
            <PrivateRoute path="/filtered/:id" component={FilteredPage} />
            <PrivateRoute component={NotFoundPage}/>
        </Switch>
    </Router>
)

export default Routes;