import React from 'react';
import SessionList from '../components/SessionsList';
import SessionsStore from '../stores/SessionsStore';
import animationConstants from '../constants/animationConstants';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Sessions extends React.Component {

    render() {

        const {sessionTypeId} = this.props.location.query;

        return (
            <ReactCSSTransitionGroup
                transitionName="page-transition"
                transitionAppear={true}
                transitionAppearTimeout={animationConstants.animationDelay}
                transitionEnterTimeout={animationConstants.animationDelay}>
                <div id="PageContent">
                    <SessionList sessionTypeId={sessionTypeId} store={SessionsStore} />
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}