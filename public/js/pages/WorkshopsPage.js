/**
 * Created by Shin on 25/09/2016.
 */
import React from 'react';
import config from '../../config/config';
import WorkshopsStore from '../stores/WorkshopsStore';
import WorkshopList from '../components/WorkshopList';
import animationConstants from '../constants/animationConstants';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Workshops extends React.Component {

    componentWillMount() {
        document.title = `Workshops${config.titleEnding}`;
    }

    render() {
        const {workshopSetId} = this.props.location.query;


        return (
            <ReactCSSTransitionGroup
              transitionName="page-transition"
              transitionAppear={true}
              transitionAppearTimeout={animationConstants.animationDelay}
              transitionEnterTimeout={animationConstants.animationDelay}>
                <div id="PageContent">
                    <WorkshopList store={WorkshopsStore} workshopSetId={workshopSetId} />
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}