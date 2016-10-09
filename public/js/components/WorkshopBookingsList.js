/**
 * Created by Shin on 3/10/2016.
 */
import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import FirebaseAPI from '../api/firebase.api';
import Spinner from '../components/Spinner';
import {getFormattedRangeDate, getMonthDate} from '../tools/Helpers';
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


            let formattedRangeDate = getFormattedRangeDate(booking.StartDate, booking.EndDate, this.rageDateDelimeter);
            let availables = booking.maximum - booking.BookingCount;
            let monthDate = getMonthDate(booking.StartDate);
            console.log(booking.campus);
            return (
                <Card
                    key={booking.WorkshopId}
                    id={booking.WorkshopId}
                    title={booking.topic} rangeDate={formattedRangeDate}
                    maxSeats={booking.maximum} availableSeats={availables}
                    dateMeta={[monthDate.monthAsString,monthDate.date]}
                    campus={booking.campus}
                    cardType="booking"
                    disableMoreDetails={true}
                />
            );
        });

        return (
            <div class="container-cards-list container-small container-bookings-list">
                <h1>My bookings</h1>
                {bookingList}
            </div>
        );
    }

}