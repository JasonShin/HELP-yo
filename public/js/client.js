import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory, routes } from 'react-router';
var createBrowserHistory = require('history/lib/createBrowserHistory'); //TODO: Find browserHistory compatibility and if it's not compatible, role back to hashHistory
import HELPFirebase from './api/HELPFirebase';

//Hash History
var history = createBrowserHistory({queryKey: false});

//Styles
import '../css/style.scss';

//Import pages
import GeneralLayout from './pages/layouts/GeneralLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingsHistory from './pages/BookingsHistory';
import Sessions from './pages/Sessions';

import { registerHELP, registerFirebase, loginFirebase } from './api/student/StudentAPI';
//Finds root element
const app = document.getElementById('app');

ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={GeneralLayout}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="login" component={Login}></Route>
            <Route path="bookings/history" component={BookingsHistory} onEnter={HELPFirebase.requireAuth}></Route>
        </Route>
    </Router>,
    app
);