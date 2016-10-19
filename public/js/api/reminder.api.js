import config from '../../config/config';
const axios = require('axios');

/**
 * Created by Shin on 2/10/2016.
 */

export const setReminderViaEmail = (opt) => {
    const {year, month, day, hour, minute, second, to, subject, content} = opt;

};

export const sendReminder = (opt) => {
    return new Promise((resolve, reject) => {
        axios.post(`${config.nodeBaseURL}emailNotification`,  opt).then((val) => {
            console.log(val);
        });
    });
};