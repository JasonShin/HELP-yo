import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory, routes } from 'react-router';
var createBrowserHistory = require('history/lib/createBrowserHistory'); //TODO: Find browserHistory compatibility and if it's not compatible, role back to hashHistory
import FirebaseAPI from './api/firebase.api';

//Hash History
var history = createBrowserHistory({queryKey: false});

//Styles
import '../css/style.scss';
import 'react-date-picker/index.css'; //Date picker dependent css

//Import pages
import GeneralLayout from './pages/layouts/GeneralLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingsHistory from './pages/BookingsHistory';
import Sessions from './pages/Sessions';

//import { registerHELP, registerFirebase, loginFirebase } from './api/student.api';
//Finds root element
const app = document.getElementById('app');


ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={GeneralLayout}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="login" component={Login}></Route>
            <Route path="register" component={Register}></Route>
            <Route path="bookings/history" component={BookingsHistory} onEnter={FirebaseAPI.requireAuth}></Route>
        </Route>
    </Router>,
    app
);