/**
 * Created by Shin on 3/10/2016.
 */
import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import FirebaseAPI from '../api/firebase.api';
import Spinner from '../components/Spinner';
import WorkshopBookingsStore from '../stores/WorkshopBookingsStore';

@observer
export default class WorkshopBookingsList extends React.Component {

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

            return (
                <div key={booking.workshopID}>
                    <div>{booking.workshopID}</div>
                    <div>{booking.studentID}</div>
                </div>
            )
        });

        return (
            <div class="container-small">
                {bookingList}
            </div>
        );
    }

}