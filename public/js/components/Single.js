/**
 * Created by Shin on 1/10/2016.
 */
import React from 'react';
import { observer } from 'mobx-react';
import WorkshopModel from '../models/WorkshopModel';
import {getFormattedRangeDate, parseEmailForFirebase } from '../tools/Helpers';
import WorkshopBookingsStore from '../stores/WorkshopBookingsStore';
import StudentStore from '../stores/StudentStore';
import FirebaseAPI from '../api/firebase.api';
import Spinner from '../components/Spinner';
import {createWorkshopBookingFirebase, updateWorkshopBookingAttendedFirebase, deleteWorkshopBookingFirebase, setReminderForBooking } from '../api/workshopBookings.api';
import {addToWaitlist} from '../api/workshop.api';
import {getRandomWords} from '../tools/RandomWordHelper';
import { sendReminder } from '../api/reminder.api';


const moment = require('moment');
require('moment-precise-range-plugin');

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
            authorized: false,
            reminderType: '',
            reminderPeriod: '',
            passcodeInvalid: ''
        }
    }

    componentWillMount() {
        FirebaseAPI.context.auth().onAuthStateChanged((user) => {
            if(user) {
                let workshopId = this.props.workshopId;
                let userEmail = user.email;

                //Bind Mobx listener to single observable
                WorkshopBookingsStore.listenToSingleBookingByWorkshopId(workshopId, userEmail);

                StudentStore.fetchStudent(userEmail);

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
            let workshopTopic = this.props.workshopStore.single.topic || null;
            let workshopDescription = this.props.workshopStore.single.description || null;
            let workshopStartDate = this.props.workshopStore.single.StartDate || null;
            let workshopEndDate = this.props.workshopStore.single.EndDate || null;
            let maxSeats = this.props.workshopStore.single.maximum;
            let BookingCount = this.props.workshopStore.single.BookingCount;
            let campus = this.props.workshopStore.single.campus || null;
            let tutor = this.props.workshopStore.single.tutor || null;
            const booking = {
                workshopId: this.state.workshopId,
                studentId: this.state.studentId,
                userId: this.state.userEmail,
                topic: workshopTopic,
                description: workshopDescription,
                StartDate: workshopStartDate,
                EndDate: workshopEndDate,
                maximum: maxSeats,
                BookingCount,
                campus,
                tutor,
                passcode: getRandomWords(),
                attended: false
            };
            sendReminder({
                email: this.state.userEmail,
                subject: 'UTS HELPS - Booking notification',
                message: `Just a friendly reminder that you\'ve booked a workshop for ${booking.topic} at ${moment(booking.StartDate).format('dddd, DD/MM/YYYY h:mm a')}. If this wasn\'t you, please contact us`
            });
            createWorkshopBookingFirebase(booking);

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

            //TODO: Make sure nullifying single into '' no bugs
            WorkshopBookingsStore.single = '';
        } else {
            console.log('You are not authorized to perform Booking action');
        }
    }

    onClickSubmitAttendance(e) {
        e.preventDefault();
        var singleBooking = WorkshopBookingsStore.single;
        var currentPasscodeVal = this.passcodeField.value;

        console.log('INFO - PASSCODE HINT: ', singleBooking.passcode);

        if(currentPasscodeVal === singleBooking.passcode) {
            updateWorkshopBookingAttendedFirebase({
                workshopId: this.state.workshopId,
                userId: this.state.userEmail,
                attended: true
            });
        } else {
            console.log('Wrong workshop!!');
            this.setState({
                passcodeInvalid: (<div class="error-generic">passcode is invalid!</div>)
            });
        }

    }

    //TODO: Fix reminder feature => Throws 404 error
    //TODO: get these working
    onClickReminder = (reminderPayload) => {
        let reminderMethod = this.reminderMethod.value;
        let reminderTime = this.reminderTime.value;
        let phoneNumber;
        if (this.phoneNumber) {
            phoneNumber = this.phoneNumber.value;
        }

        let workshopStart = new Date(reminderPayload.start);
        console.log(reminderMethod);
        console.log(reminderTime);
        console.log(StudentStore.student);

        switch(reminderMethod) {
            case 'email': {
                this.setEmailNotification(workshopStart, reminderTime, reminderPayload);
                break;
            }
            case 'sms': {
                this.setSmsNotification(workshopStart, reminderTime, reminderPayload, phoneNumber);
                break;    
            }
        }
    };

    setEmailNotification(workshopTime, reminderTime, reminderPayload) {
        let absoluteReminderTime = workshopTime;
        switch(reminderTime) {
            case '1hour': {
                absoluteReminderTime.setHours(absoluteReminderTime.getHours() - 1); 
                break;
            }
            case '1day': {
                absoluteReminderTime.setDate(absoluteReminderTime.getDate() - 1);
                break;
            }
            case '2days': {
                absoluteReminderTime.setDate(absoluteReminderTime.getDate() - 2);
                break;
            }
        }

        setReminderForBooking({
            StartDate: absoluteReminderTime.getTime(),
            to: this.state.userEmail,
            subject: 'HELPS - Workshop Reminder',
            content: `You have registered for the ${reminderPayload.title} workshop at ${reminderPayload.room} at ${reminderPayload.duration}`,
            type: 'mail',
        });
    }

    setSmsNotification(workshopTime, reminderTime, reminderPayload, phoneNumber) {
        let absoluteReminderTime = workshopTime;
        console.log(reminderPayload);
        switch(reminderTime) {
            case '1hour': {
                absoluteReminderTime.setHours(absoluteReminderTime.getHours() - 1); 
                break;
            }
            case '1day': {
                absoluteReminderTime.setDate(absoluteReminderTime.getDate() - 1);
                break;
            }
            case '2days': {
                absoluteReminderTime.setDate(absoluteReminderTime.getDate() - 2);
                break;
            }
        }
        const message = `Reminder: You have a '${reminderPayload.title}' workshop at ${reminderPayload.room} on ${reminderPayload.duration}`;
        setReminderForBooking({
            StartDate: absoluteReminderTime.getTime(),
            to: phoneNumber,
            subject: 'HELPS - Workshop Reminder',
            content: message,
            type: 'sms',
        });

    }

    onReminderTypeChange() {
        const reminderType = this.reminderMethod.value;
        if (reminderType && reminderType.trim() !== '') {
            this.setState({
                reminderType,
            });
        }
    }

    onWaitlistClick() {
        const wrkShp = this.props.workshopStore.single;
        addToWaitlist({
            workshopId: wrkShp.WorkshopId,
            email: this.state.userEmail,
        });
        this.props.workshopStore.refreshWaitlist(wrkShp.WorkshopId);
    }

    //TODO: Fix naming convention spinnerEnabled => workshopSpinnerEnabled   singleInstance => workshopSingleInstance
    render() {
        const singleInstance = this.props.workshopStore.single;
        const waitlist = this.props.workshopStore.singleWaitlist;
        let alreadySubscribedToWaitlist = false;
        const {spinnerEnabled, passcodeInvalid} = this.state;
        var singleBooking = WorkshopBookingsStore.single;
        var bookingSpinnerEnabled = true;

        //Find out if workshop booking single has been fetched
        console.log('Workshop booking store single!  ' , WorkshopBookingsStore.single);
        if(singleBooking !== null || singleBooking === '') {
            bookingSpinnerEnabled = false;
        }


        //Rendering Single component STARTS
        let singleComponent = '';
        if(singleInstance instanceof WorkshopModel) {

            let formattedDate = getFormattedRangeDate(singleInstance.StartDate, singleInstance.EndDate, this.rangeDateDelimeter);
            let availables = singleInstance.maximum - singleInstance.BookingCount;
            let bookingButton = '';
            let reminderButton = '';
            let phoneNumberInput = '';
            let attendanceFields = '';

            const duration = moment.preciseDiff(moment(singleInstance.StartDate.split('T').join(' ')),
                moment(singleInstance.EndDate.split('T').join(' ')));

            const reminderPayload = {
                start: singleInstance.StartDate.split('T').join(' '),
                title: singleInstance.topic,
                room: singleInstance.campus,
                duration: formattedDate,
            };

            //Show cancel booking

            //Todo optimize this to properly wait for response from Firebase

            const isWorkshopOver = (moment(Date.now()).isAfter(singleInstance.EndDate));
            const isWorkshopOnNow = (moment(Date.now()).isBetween(singleInstance.StartDate, singleInstance.EndDate, null, '[]'));

            const isFull = (availables <= 0);

            if (waitlist) {
                if (waitlist[parseEmailForFirebase(this.state.userEmail)]) {
                    alreadySubscribedToWaitlist = true;
                }
            }

            if(singleBooking !== null && singleBooking !== '') {
                bookingButton = (<button class="button-book-cancel" onClick={this.onBookCancelClick.bind(this)}>cancel booking</button>);
                if (this.state.reminderType === 'sms') {
                    phoneNumberInput = (
                        <div class="form-group">
                            <input type="text" ref={ (c) => this.phoneNumber = c  } required="true" />
                        </div>
                    );
                }
                reminderButton = (
                    <div class="reminder-methods">

                        <h2>
                            Reminders
                        </h2>

                        <div class="form-group-select">
                            <label>choose a reminder method</label>
                            <select onChange={this.onReminderTypeChange.bind(this)} ref={(c) => this.reminderMethod = c}>
                                <option value="">--- options ---</option>
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                            </select>
                        </div>

                        <div class="form-group-select">
                            <label>reminder time</label>
                            <select ref={(c) => this.reminderTime = c}>
                                <option value="">--- options ---</option>
                                <option value="1hour">1 hour before</option>
                                <option value="1day">1 day before</option>
                                <option value="2days">2 days before</option>
                            </select>
                        </div>
                        {phoneNumberInput}
                        <button class="button-reminder" onClick={() => this.onClickReminder(reminderPayload)}>Set reminder</button>
                    </div>
                );

                if(singleBooking.attended == false && isWorkshopOnNow) {
                    attendanceFields = (
                        <div>
                            <h2>
                                Please enter your passcode!
                            </h2>
                            <div class="form-group">
                                <input type="text" ref={ (c) => this.passcodeField = c  } required="true" />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>PASSCODE</label>
                            </div>
                            {passcodeInvalid}
                            <button class="button-reminder" onClick={this.onClickSubmitAttendance.bind(this)}>Submit Attendance</button>
                        </div>
                    );
                }
            } else if (isWorkshopOver) {
                bookingButton = (<button class="button-book-cancel">workshop is over</button>);
            } else if (isFull && !alreadySubscribedToWaitlist) {
                bookingButton = (<button class="button-book-cancel" onClick={this.onWaitlistClick.bind(this)}>subscribe to waitlist</button>);
            } else if (isFull && alreadySubscribedToWaitlist) {
                bookingButton = (<button class="button-book-cancel">subscribed to waitlist</button>);
            } else {
                bookingButton = (<button class="button-book" onClick={this.onBookNowClick.bind(this)}>book now</button>);
            }

            singleComponent = (

                <div class="single">

                    <Spinner visible={spinnerEnabled} />

                    <div class="single-meta-top">
                        <div class="single-meta-top-left">
                            <div>

                                <img src="https://firebasestorage.googleapis.com/v0/b/helps-uts-project.appspot.com/o/photo-1427477321886-abc24e8ce923.jpg?alt=media&token=5eed6ce0-cacc-4962-aa63-0386fe1025cc" />

                            </div>
                        </div>

                        <div class="single-meta-top-right">
                            <div>

                                <header>{singleInstance.topic}</header>
                                <div class="single-ranged-date">{formattedDate}</div>
                                <div class="single-ranged-date">{duration}</div>
                                <div class="single-target-group">
                                    <h3>target group</h3>
                                    <div>{singleInstance.targetingGroup}</div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="single-controls">
                        <div>

                            <div class="single-controls-left">
                                <Spinner visible={bookingSpinnerEnabled} />
                                <div>
                                    {attendanceFields}
                                </div>
                            </div>

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
                                <div>
                                    <h3>Tutor</h3>
                                    <div>{singleInstance.tutor}</div>
                                </div>
                                <div>
                                    <h3>Type</h3>
                                    <div>{singleInstance.type}</div>
                                </div>
                                <div>
                                    <h3>Attended</h3>
                                    <div>{singleInstance.attended ? 'Yes' : 'No'}</div>
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