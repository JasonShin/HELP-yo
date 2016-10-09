/**
 * Created by Shin on 3/10/2016.
 */
import React from 'react';
import { observer } from 'mobx-react';
import {ReactRouter, Router, Link, withRouter} from 'react-router';
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
                this.getFilteredBookings();
            } else {
                console.log('<WorkshopBookingList /> is not authenticated!');
            }
        });
    }

    onClickPastBookings(e) {
        e.preventDefault();
        console.log('INFO: Past clicked');
        this.props.router.push('/bookings/past');
    }

    onClickFutureBookings(e) {
        e.preventDefault();
        console.log('INFO: Future clicked');
        this.props.router.push('/bookings/future');
    }

    componentWillReceiveProps(nextProps) {
        console.log('INFO: workshop booking received props');
        this.getFilteredBookings();
    }

    getFilteredBookings() {
        var param = window.location.pathname.split('\/')[2];
        switch(param) {
            case 'past':
                WorkshopBookingsStore.showFuture = false;
                break;
            case 'future':
                WorkshopBookingsStore.showFuture = true;
                break;
        }
    }

    render() {
        console.log('INFO: workshop booking list rendered');
        const bookingList = WorkshopBookingsStore.filteredBookings.map((booking) => {

            let formattedRangeDate = getFormattedRangeDate(booking.StartDate, booking.EndDate, this.rageDateDelimeter);
            let availables = booking.maximum - booking.BookingCount;
            let monthDate = getMonthDate(booking.StartDate);

            return (
                <Card
                    key={booking.workshopId}
                    id={booking.workshopId}
                    title={booking.topic} rangeDate={formattedRangeDate}
                    maxSeats={booking.maximum} availableSeats={availables}
                    dateMeta={[monthDate.monthAsString,monthDate.date]}
                    campus={booking.campus}
                    cardType="workshop"
                    disableMoreDetails={true}
                />
            );
        });

        return (
            <div class="container-cards-list container-small container-bookings-list">
                <h1>My bookings</h1>

                <div class="bookings-filter">
                    <span onClick={this.onClickPastBookings.bind(this)}>Past</span>
                    <span onClick={this.onClickFutureBookings.bind(this)}>Future</span>
                </div>

                {bookingList}
            </div>
        );
    }

}

export default withRouter(WorkshopBookingsList);