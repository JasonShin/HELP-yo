/**
 * Created by Shin on 3/10/2016.
 */
import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import FirebaseAPI from '../api/firebase.api';
import Spinner from '../components/Spinner';
import WorkshopBookingsStore from '../stores/WorkshopBookingsStore';
import Card from '../components/Card';

@observer
export default class WorkshopBookingsList extends React.Component {

    rageDateDelimeter = ' - ';

    constructor() {
        super();
    }

    componentWillMount() {
        FirebaseAPI.context.auth().onAuthStateChanged((user) => {
            if(user) {
                let userEmail = user.email;

                WorkshopBookingsStore.listenToBookingsByUserId(userEmail);
            } else {
                console.log('<WorkshopBookingList /> is not authenticated!');
            }
        });
    }

    render() {

        const bookingList = WorkshopBookingsStore.bookings.map((booking) => {


            let formattedRangeDate = getFormattedRangeDate(booking.StartDate, workshop.EndDate, this.rageDateDelimeter);
            let availables = workshop.maximum - workshop.BookingCount;
            let monthDate = getMonthDate(booking.StartDate);

            return (
                <Card
                    key={workshop.WorkshopId}
                    id={workshop.WorkshopId}
                    title={workshop.topic} rangeDate={formattedRangeDate}
                    maxSeats={maxSeats} availableSeats={availables}
                    dateMeta={[monthDate.monthAsString,monthDate.date]}
                    campus={workshop.campus}
                    cardType="workshop"
                />
            );
        });

        return (
            <div class="container-small">
                {bookingList}
            </div>
        );
    }

}