/**
 * Created by Shin on 24/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import moment from 'moment';
import {monthOfYearString} from '../tools/Helpers';
import Spinner from '../components/Spinner';

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

                <article class="card" key={session.SessionId}>
                    <div class="card-inner">
                        <div class="card-meta-left">
                            <header>{session.SessionType}</header>
                            <div><i class="fa fa-graduation-cap" aria-hidden="true"></i> {session.LecturerEmail}</div>
                            <div class="card-more-details">more details</div>
                        </div>

                        <div class="card-meta-right">
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