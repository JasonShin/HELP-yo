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
//TODO: Refactor all these pages to have component naming convention: e.g. SessionsPage
import GeneralLayout from './pages/layouts/GeneralLayout';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import MyProfile from './pages/MyProfile';
import SessionTypesPage from './pages/SessionTypesPage';
import BookingsHistory from './pages/BookingsHistory';
import SessionsPage from './pages/SessionsPage';
import WorkshopSetsPage from './pages/WorkshopSetsPage';
import WorkshopsPage from './pages/WorkshopsPage';

//Finds root element
const app = document.getElementById('app');


//TODO: Create <Route path="register/profile" component={MyProfile}></Route>  for UX = keeping users in context
//TODO: Priority 2
ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={GeneralLayout}>
            <IndexRoute component={SessionTypesPage} />
            <Route path="login" component={Login} />
            <Route path="register" component={RegisterPage} />
            <Route path="register/profile" component={MyProfile} />
            <Route path="profile" component={MyProfile} />
            <Route path='sessions' component={SessionsPage} />
            <Route path='workshopSets' component={WorkshopSetsPage} />
            <Route path='workshops' component={WorkshopsPage} />

            <Route path="bookings/history" component={BookingsHistory} onEnter={FirebaseAPI.requireAuth}></Route>
        </Route>
    </Router>,
    app
);