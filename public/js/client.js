import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory, routes } from 'react-router';

//Import pages
import GeneralLayout from './pages/layouts/GeneralLayout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingsHistory from './pages/BookingsHistory';
import Sessions from './pages/Sessions';

//Finds root element
const app = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory} route={routes}>
        <Route path="/" component={GeneralLayout}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="bookings/history" name="bookingsHistory" component={BookingsHistory}></Route>

        </Route>
    </Router>,
    app
);