/**
 * Created by Shin on 24/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import moment from 'moment';
import {monthOfYearString} from '../tools/Helpers';

@observer
export default class SessionsList extends React.Component {

    componentDidMount() {
        const {studentId, sessionTypeId} = this.props;
        this.props.store.fetchSessions('', sessionTypeId);
    }

    getBuildingNumber(building) {
        return building.split('\.')[0];
    }

    //TODO: Possibly refactored
    getMonthDate(rawDate) {
        let momentDate = moment(rawDate)
        let monthAsString = monthOfYearString(momentDate.month()).substring(0,3);
        let date = momentDate.date();

        return {monthAsString, date};
    }

    render() {
        const sessionsList = this.props.store.sessions.map( (session) => {
            var monthDate = this.getMonthDate(session.StartDate);

            return (
                <article class="session" key={session.SessionId}>
                    <div class="session-inner">
                        <div class="session-meta-left">
                            <header>{session.SessionType}</header>
                            <div>{session.StartDate}</div>
                        </div>

                        <div class="session-meta-right">
                            <div class="date-meta">
                                <span>{monthDate.monthAsString}</span>
                                <span>{monthDate.date}</span>
                            </div>

                            <div class="building-number-meta">
                                <i class="fa fa-building" aria-hidden="true"></i>
                                <span>{this.getBuildingNumber(session.Campus)}</span>
                            </div>
                        </div>
                    </div>
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