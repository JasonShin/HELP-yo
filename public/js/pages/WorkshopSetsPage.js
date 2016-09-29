/**
 * Created by Shin on 24/09/2016.
 */
import React from 'react';

import WorkshopSetsStore from '../stores/WorkshopSetsStore';
import WorkshopSetList from '../components/WorkshopSetList';
import config from '../../config/config';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Home extends React.Component {
    componentWillMount() {
        document.title = `Workshop Sets${config.titleEnding}`;
    }

    render() {
        console.log('workshop sets!');
        return (
            <ReactCSSTransitionGroup
                transitionName="page-transition"
                transitionAppear={true}
                transitionAppearTimeout={800}
                transitionEnterTimeout={800}>
                <div id="PageContent">
                    <WorkshopSetList store={WorkshopSetsStore}/>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}