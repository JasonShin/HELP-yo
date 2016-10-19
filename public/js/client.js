import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, routes } from 'react-router';
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
import Bookings from './pages/Bookings';
import SessionsPage from './pages/SessionsPage';
import WorkshopSetsPage from './pages/WorkshopSetsPage';
import WorkshopsPage from './pages/WorkshopsPage';
import WorkshopPage from './pages/WorkshopPage';
import CreateWorkshopPage from './pages/CreateWorkshopPage';

import injectTapEventPlugin from 'react-tap-event-plugin';
 
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

//Finds root element
const app = document.getElementById('app');


//TODO: Create <Route path="register/profile" component={MyProfile}></Route>  for UX = keeping users in context
//TODO: Priority 2
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={GeneralLayout}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
            <Route path="sessions" component={SessionTypesPage} />
            <Route path="register" component={RegisterPage} />
            <Route path="register/profile" component={MyProfile} onEnter={FirebaseAPI.requireAuth} />
            <Route path="profile" component={MyProfile} onEnter={FirebaseAPI.requireAuth} />
            <Route path='sessions' component={SessionsPage} onEnter={FirebaseAPI.requireAuth} />
            <Route path='workshopSets' component={WorkshopSetsPage} onEnter={FirebaseAPI.requireAuth} />
            <Route path='workshops' component={WorkshopsPage} onEnter={FirebaseAPI.requireAuth} />
            <Route path='workshop' component={WorkshopPage} onEnter={FirebaseAPI.requireAuth} />
            <Route path="bookings/past" component={Bookings} onEnter={FirebaseAPI.requireAuth} />
            <Route path="bookings/future" component={Bookings} onEnter={FirebaseAPI.requireAuth} />
            <Route path="bookings/workshop" component={WorkshopPage} onEnter={FirebaseAPI.requireAuth} />
            <Route path="createWorkshop" component={CreateWorkshopPage} onEnter={FirebaseAPI.requireAuth} />
        </Route>
    </Router>,
    app
);