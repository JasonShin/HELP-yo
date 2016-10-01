/**
 * Created by Shin on 24/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import {getMonthDate} from '../tools/Helpers';
import Spinner from '../components/Spinner';
import Card from '../components/Card';

@observer
export default class SessionsList extends React.Component {

    componentDidMount() {
        const {studentId, sessionTypeId} = this.props;
        this.props.store.fetchSessions('', sessionTypeId);
    }


    render() {
        const sessionsList = this.props.store.sessions.map( (session) => {

            var monthDate = getMonthDate(session.StartDate);
            return (
                <Card
                    id={session.SessionId}
                    title={session.SessionType} lecturerEmail={session.LecturerEmail}
                    dateMeta={[monthDate.monthAsString,monthDate.date]}
                    campus={session.Campus}
                />
            );

        } );

        //Enabling spinner depending on list of sessions returned
        let enableSpinner = true;

        if(sessionsList.length > 0) {
            enableSpinner = false;
        }


        return (
            <div class="container-cards-list container-medium">
                <Spinner visible={enableSpinner} />
                <h1>Sessions</h1>
                <div>
                    {sessionsList}
                </div>
            </div>
        );
    }
}