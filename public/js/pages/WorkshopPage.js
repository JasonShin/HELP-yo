/**
 * Created by Shin on 1/10/2016.
 */

import React from 'react';
import WorkshopsStore from '../stores/WorkshopsStore';
import WorkshopList from '../components/WorkshopList';
import animationConstants from '../constants/animationConstants';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Workshop extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                Single workshop
            </div>
        )
    }
}
