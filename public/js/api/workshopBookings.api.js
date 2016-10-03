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

    const { workshopId, studentId, userId } = opts;
    const params = {
        workshopId,
        studentId,
        userId,
    };


    FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId).set({
        workshopId,
        studentId,
        userId
    });
};

export const deleteWorkshopBookingFirebase = (opts) => {

    const { workshopId, userId} = opts;
    const params = {
        workshopId,
        userId
    };

    FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId).remove();
};

export const getWorkshopBookingFirebaseByUserId = (userId) => {

    console.log(userId);
    return FirebaseAPI.context.database().ref('/workshopBookings/userId/'+parseEmailForFirebase(userId));
};

export const getWorkshopBookingFirebaseByWorkshopId = (opts) => {
    const { workshopId, userId } = opts;
    const params = {
        workshopId,
        userId
    };
    console.log('searching for! ' , workshopId, userId);
    return FirebaseAPI.context.database().ref('/workshopBookings/userId/' + parseEmailForFirebase(userId) + '/workshopId/' + workshopId);
};

/**
 * For now, reminder will be sent at 9AM
 * @param opt
 */
export const setReminderForBooking = (opt) => {
    const {StartDate, to, subject, content} = opt;
    var workshopStartDate = moment(StartDate);
    let year = workshopStartDate.year();
    let month = workshopStartDate.month();
    let date = workshopStartDate.date();
    let hour = 9;
    let minute = 0;
    let second = 0;

    var params = {
        year, month, date, hour, minute, second, to, subject, content
    };

    return new Promise((resolve, reject) => {
        axios.post(`${config.mailBaseURL}setReminder`, params).then((val) => {
            if (val.data.IsSuccess === 'false') {
                reject(val.data.DisplayMessage);
            } else {
                resolve(val);
            }
        });
    });

};
/* WorkshopBookings FIREBASE ENDS */