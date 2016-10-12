/**
 * Created by Shin on 3/10/2016.
 */
import config from '../../config/config';
import {parseEmailForFirebase} from '../tools/Helpers';
import FirebaseAPI from '../api/firebase.api';
import moment from 'moment';
const axios = require('axios');
/* WorkshopBookings FIREBASE STARTS */
export const createWorkshopBookingFirebase = (opts) => {

    const { workshopId, studentId, userId, topic, description, StartDate } = opts;

    console.log('INFO: creating workshop bookings to Firebase ' , topic, description, StartDate);

    FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId).set(opts);
};

export const updateWorkshopBookingAttendedFirebase = (opts) => {

    const { workshopId, userId } = opts;

    console.log('INFO: updated attendance ' , workshopId, userId);

    FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId).update(opts);
};

export const deleteWorkshopBookingFirebase = (opts) => {

    const { workshopId, userId} = opts;

    console.log('INFO: Deleting workshop bookings from Firebase ' , workshopId, userId);

    FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId).remove();
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
    var workshopStartDate = moment(StartDate);
    let year = workshopStartDate.year();
    let month = workshopStartDate.month();
    let date = workshopStartDate.date();
    let hour = workshopStartDate.hour();
    let minute = workshopStartDate.minute();
    let second = workshopStartDate.second();

    var params = {
        year, month, date, hour, minute, second,
    };

    let urlPrefix;
    if (type === 'mail') {
        urlPrefix = config.mailBaseURL;
        params.to = to;
        params.subject = subject
        params.content = content;
    } else if (type === 'sms') {
        urlPrefix = config.smsBaseURL;
        params.number = to;
        params.message = content;
    }

    var postParams = {
        params: params
    };

    return new Promise((resolve, reject) => {

        console.log(`INFO: reminder ${type} URL: `, (`${urlPrefix}setReminder`) );
        console.log(params);

        axios.get(`${urlPrefix}setReminder`, postParams).then((val) => {
            if (val.data.IsSuccess === 'false') {
                reject(val.data.DisplayMessage);
            } else {
                resolve(val);
            }
        });
    });

};
/* WorkshopBookings FIREBASE ENDS */