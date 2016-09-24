import React from 'react';
import SessionList from '../components/SessionsList';
import SessionsStore from '../stores/SessionsStore';

export default class Sessions extends React.Component {

    render() {

        const {sessionTypeId} = this.props.location.query;

        return (
            <div>
                <h1>Sessions</h1>
                <SessionList sessionTypeId={sessionTypeId} store={SessionsStore} />
            </div>
        );
    }
}