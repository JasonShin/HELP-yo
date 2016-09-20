import config from '../../config/config';
const axios = require('axios');

const axiosHeader = {
    'AppKey': config.appKey,
    'Accept': 'application/json'
};

//SESSION BOOKINGS STARTS
export const searchSessionBookingsByStudentId = (opt) => {

    const {studentId} = opt;

    const getParams = {
        headers: axiosHeader,
        params: {
            studentId
        }
    };

    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};

export const searchSessionBookingsByDate = (opt) => {

    const {campus} = opts;

    const getParams = {
        headers: axiosHeader,
        params: {
            startingDtBegin,
            startingDtEnd,
            endingDtBegin,
            endingDtEnd
        }
    };

    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};


export const searchSessionBookingsByCampus = (opt) => {

    const {campus} = opts;

    const getParams = {
        headers: axiosHeader,
        params: {
            campus
        }
    };

    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};

export const searchSessionBookingsCampusByCampus = (opt) => {

    const {campus} = opts;

    const getParams = {
        headers: axiosHeader,
        params: {
            campus
        }
    };

    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};

export const searchSessionBookingsCampusByLecturerId = (opt) => {

    const {lecturerId} = opts;

    const getParams = {
        headers: axiosHeader,
        params: {
            lecturerId
        }
    };

    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};

export const searchSessionBookingsBySessionTypeId = (opt) => {
    const {sessionTypeId} = opts;

    const getParams = {
        headers: axiosHeader,
        params: {
            sessionTypeId
        }
    };
    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};

export const searchSessionBookingsByPage = (opt) => {
    const {sessionTypeId} = opts;

    const getParams = {
        headers: axiosHeader,
        params: {
            sessionTypeId
        }
    };
    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};
//SESSION BOOKINGS ENDS