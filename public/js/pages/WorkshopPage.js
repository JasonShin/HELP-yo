/**
 * Created by Shin on 1/10/2016.
 */

import React from 'react';
import WorkshopsStore from '../stores/WorkshopsStore';
import animationConstants from '../constants/animationConstants';

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import Single from '../components/Single';

export default class Workshop extends React.Component {


    constructor() {
        super();
        this.state = {
            currentWorkshop: null
        };
    }

    componentWillMount() {

        const {workshopId} = this.props.location.query;
        WorkshopsStore.findWorkshopById(workshopId);

        this.setState({
            workshopId
        });

    }

    render() {

        const {workshopId} = this.state;

        return (
            <div>
                <Single workshopStore={WorkshopsStore} workshopId={workshopId} />
            </div>
        )
    }
}