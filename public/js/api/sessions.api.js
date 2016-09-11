import config from '../../config/config';
const axios = require('axios');
const axiosConfig = {
    headers: {
        'AppKey': config.appKey,
        'Accept': 'application/json'
    }
};

export const getAllSessionsTypes = () => {

    return axios.get(`${config.baseURL}session/sessionTypes/true`, {},axiosConfig);
};

export const searchSessionBookingsByDate = (opt) => {

    const {studentId, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd} = opt;
    const params = {
        studentId,
        startingDtBegin,
        startingDtEnd,
        endingDtBegin,
        endingDtEnd
    };

    return axios.get(`${config.baseURL}session/booking/search`, {axiosConfig, params});
};


//(studentId, sessionTypeId) => filtered sessions  topic = session type
export const searchSessionBookingsByTopic = (opt) => {
    const {studentId, sessionTypeId} = opt;
    const params = {
        studentId,
        sessionTypeId
    };

    return axios.get(`${config.baseURL}session/booking/search`, {}, {axiosConfig, params});
};

export const searchSessionBookingByLocation = (opt) => {
    const {studentId, campus} = opt;
    const params = {
        studentId,
        campus
    };

    return axios.get(`${config.baseURL}session/booking/search`, {}, {axiosConfig, params});

};

export const searchSessionBookingByTutor = (opt) => {
    const {studentId, lecturerId} = opt;
    const params = {
        studentId,
        lecturerId
    };

    return axios.get(`${config.baseURL}session/booking/search`, {}, {axiosConfig, params});
};