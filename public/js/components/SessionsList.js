/**
 * Created by Shin on 24/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';

@observer
export default class SessionsList extends React.Component {
    componentDidMount() {
        const {studentId, sessionTypeId} = this.props;
        this.props.store.fetchSessions('', sessionTypeId);
    }

    render() {
        const sessionsList = this.props.store.sessions.map( (session) => {
            return (
                <article class="session" key={session.SessionId}>
                    <header>{session.Campus}</header>
                    {session.SessionId}
                </article>
            )
        } );

        return (
            <div>
                {sessionsList}
            </div>
        );
    }
}