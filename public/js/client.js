import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory, routes } from 'react-router';

//Import pages
import GeneralLayout from './pages/layouts/GeneralLayout';
import Home from './pages/Home';

//Finds root element
const app = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory} route={routes}>
        <Route path="/" component={GeneralLayout}>
            <IndexRoute component={Home}></IndexRoute>
        </Route>
    </Router>,
    app
);