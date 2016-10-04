/**
 * Created by Shin on 1/10/2016.
 */
import React from 'react';
import { observer } from 'mobx-react';
import WorkshopModel from '../models/WorkshopModel';
import {getFormattedRangeDate} from '../tools/Helpers';
import WorkshopBookingsStore from '../stores/WorkshopBookingsStore';
import FirebaseAPI from '../api/firebase.api';
import Spinner from '../components/Spinner';
import {createWorkshopBookingFirebase, deleteWorkshopBookingFirebase, setReminderForBooking} from '../api/workshopBookings.api';

@observer
export default class Single extends React.Component {

    rangeDateDelimeter = ' - ';



    constructor() {
        super();
        this.state = {
            workshopId: 0,
            studentId: 0,
            userEmail: '',
            spinnerEnabled: true,
            authorized: false
        }
    }

    componentWillMount() {
        FirebaseAPI.context.auth().onAuthStateChanged((user) => {
            if(user) {
                let workshopId = this.props.workshopId;
                let userEmail = user.email;


                //Bind Mobx listener to single observable

                WorkshopBookingsStore.listenToSingleBookingByWorkshopId(workshopId, userEmail);

                //Disable spinner since the component is authorized
                this.setState({
                    spinnerEnabled: false,
                    authorized: true,
                    workshopId: workshopId,
                    userEmail: userEmail
                });
            } else {
                console.log('<Single /> is not authorized!');
            }
        });

    }

    onBookNowClick(e) {
        e.preventDefault();
        if(this.state.authorized) {

            //Required to easily figure out workshop details from bookings data stored on Firebase
            let workshopTopic = this.props.workshopStore.single.topic;
            let workshopDescription = this.props.workshopStore.single.description;
            let workshopStartDate = this.props.workshopStore.single.StartDate;

            createWorkshopBookingFirebase({
                workshopId: this.state.workshopId,
                studentId: this.state.studentId,
                userId: this.state.userEmail,
                topic: workshopTopic,
                description: workshopDescription,
                StartDate: workshopStartDate
            });
        } else {
            console.log('You are not authorized to perform Booking action');
        }

    }

    onBookCancelClick(e) {
        e.preventDefault();
        if(this.state.authorized) {
            deleteWorkshopBookingFirebase({
                workshopId: this.state.workshopId,
                userId: this.state.userEmail
            });
            //Making sure nullifying single booking observable
            //TODO: Optimize this
            WorkshopBookingsStore.single = null;
        } else {
            console.log('You are not authorized to perform Booking action');
        }
    }

    //TODO: Fix reminder feature => Throws 404 error
    onClickReminder(e) {
        e.preventDefault();
        let reminderMethod = this.reminderMethod.value;
        setReminderForBooking({
            StartDate: '2016-10-03T18:47:00',
            to: 'visualbbasic@gmail.com',
            subject: 'Test email from frontend',
            content: 'test!!'
        });
        //2012-07-31T17:00:00
        console.log(this.props.workshopStore.single.StartDate);
        switch(reminderMethod) {
            case 'email':

                break;

            case 'sms':

                break;
        }

    }

    //TODO: Fix naming convention spinnerEnabled => workshopSpinnerEnabled   singleInstance => workshopSingleInstance
    render() {
        const singleInstance = this.props.workshopStore.single;
        const {spinnerEnabled} = this.state;

        var bookingSpinnerEnabled = true;

        //Find out if workshop booking single has been fetched
        console.log('Workshop booking store single!');
        if(WorkshopBookingsStore.single !== null) {
            bookingSpinnerEnabled = false;
        }


        //Rendering Single component STARTS
        let singleComponent = '';
        if(singleInstance instanceof WorkshopModel) {

            let formattedDate = getFormattedRangeDate(singleInstance.StartDate, singleInstance.EndDate, this.rangeDateDelimeter);
            let availables = singleInstance.maximum - singleInstance.BookingCount;
            let bookingButton = '';
            let reminderButton = '';

            //Show cancel booking
            let singleBooking = WorkshopBookingsStore.single;
            //Todo optimize this to properly wait for response from Firebase


            if(singleBooking !== null) {
                bookingButton = (<button class="button-book-cancel" onClick={this.onBookCancelClick.bind(this)}>cancel booking</button>);
                reminderButton = (
                    <div class="reminder-methods">
                        <select ref={(c) => this.reminderMethod = c}>
                            <option value="">choose a reminder method</option>
                            <option value="email">Email</option>
                            <option value="sms">SMS</option>
                        </select>
                        <button class="button-reminder" onClick={this.onClickReminder.bind(this)}>Set reminder</button>
                    </div>
                );
            } else {
                bookingButton = (<button class="button-book" onClick={this.onBookNowClick.bind(this)}>book now</button>);

            }


            singleComponent = (

                <div class="single">

                    <Spinner visible={spinnerEnabled} />

                    <div class="single-meta-top">
                        <div class="single-meta-top-left">
                            <div>

                                banner

                            </div>
                        </div>

                        <div class="single-meta-top-right">
                            <div>

                                <header>{singleInstance.topic}</header>
                                <div class="single-ranged-date">{formattedDate}</div>
                                <div class="single-target-group">
                                    <h3>target group</h3>
                                    <div>{singleInstance.targetingGroup}</div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="single-controls">
                        <div>
                            <div class="single-controls-right">
                                <Spinner visible={bookingSpinnerEnabled} />
                                <div>
                                    {bookingButton}
                                </div>
                                <div>
                                    {reminderButton}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="single-meta-bottom">

                        <div class="single-meta-bottom-left">
                            <div>

                                <div>
                                    <h3>description</h3>
                                    <div>{singleInstance.description}</div>
                                </div>

                            </div>
                        </div>


                        <div class="single-meta-bottom-right">
                            <div>

                                <div>
                                    <h3>room</h3>
                                    <div>{singleInstance.campus}</div>
                                </div>
                                <div>
                                    <h3>spots available</h3>
                                    <div>{availables}</div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            );
        }
        //Rendering Single component ENDS

        return (
            <div class="container-medium">
                {singleComponent}
            </div>
        );
    }

}