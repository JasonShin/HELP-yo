/**
 * Created by Shin on 3/10/2016.
 */
import config from '../../config/config';
import {parseEmailForFirebase} from '../tools/Helpers';
import FirebaseAPI from '../api/firebase.api';
import { searchWorkshopByIdFirebase, updateWorkshop } from '../api/workshop.api';
import moment from 'moment';
const axios = require('axios');
/* WorkshopBookings FIREBASE STARTS */
export const createWorkshopBookingFirebase = async (opts) => {

    const { workshopId, studentId, userId, topic, description, StartDate } = opts;

    const workshop = await searchWorkshopByIdFirebase({workshopId,});

    const newBookingCount = workshop.BookingCount + 1;

    if (opts.BookingCount) {
        opts.BookingCount = newBookingCount;
    }

    FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId).set(opts);
    updateWorkshop({workshopId, BookingCount: newBookingCount});
};

export const updateWorkshopBookingAttendedFirebase = (opts) => {

    const { workshopId, userId } = opts;

    FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId).update(opts);
};

export const deleteWorkshopBookingFirebase = async (opts) => {

    const { workshopId, userId} = opts;

    const workshop = await searchWorkshopByIdFirebase({workshopId,});

    const newBookingCount = workshop.BookingCount - 1;
    if (opts.BookingCount) {
        opts.BookingCount = newBookingCount;
    }

    FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId).remove();
    updateWorkshop({workshopId, BookingCount: newBookingCount});
};

export const getWorkshopBookingFirebaseByUserId = (userId) => {

    return FirebaseAPI.context.database().ref('/workshopBookings/userId/'+parseEmailForFirebase(userId));
};

export const getWorkshopBookingFirebaseByWorkshopId = (opts) => {
    const { workshopId, userId } = opts;
    const params = {
        workshopId,
        userId
    };

    return FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId);
};

/**
 * For now, reminder will be sent at 9AM
 * @param opt
 */
export const setReminderForBooking = (opt) => {
    const {StartDate, to, subject, content, type} = opt;
    const body = {
        remindAt: StartDate
    };

    let urlPrefix;
    if (type === 'mail') {
        urlPrefix = config.mailBaseURL;
        body.to = to;
        body.subject = subject
        body.content = content;
    } else if (type === 'sms') {
        urlPrefix = config.smsBaseURL;
        body.number = to;
        body.message = content;
    }

    return new Promise((resolve, reject) => {
        axios.post(`${urlPrefix}setReminder`,  body).then((val) => {
            console.log(val);
        });
    });
};
/* WorkshopBookings FIREBASE ENDS */