import config from '../../config/config';
const axios = require('axios');
const axiosGetHeaders = {
        'AppKey': config.appKey,
        'Accept': 'application/json'
};


export const searchSessionBookingsByDate = (opt) => {

    const {studentId, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd} = opt;

    const getParams = {
        headers: axiosGetHeaders,
        params: {
            studentId,
            startingDtBegin,
            startingDtEnd,
            endingDtBegin,
            endingDtEnd
        }
    };

    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};


//(studentId, sessionTypeId) => filtered sessions  topic = session type
export const searchSessionBookingsByTopic = (opt) => {
    const {studentId, sessionTypeId} = opt;
    const getParams = {
        headers: axiosGetHeaders,
        params: {
            studentId,
            sessionTypeId
        },
    };

    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};

export const searchSessionBookingByLocation = (opt) => {
    const {studentId, campus} = opt;
    const getParams = {
        headers: axiosGetHeaders,
        params: {
            studentId,
            campus
        },
    };

    return axios.get(`${config.baseURL}session/booking/search`, getParams);

};

export const searchSessionBookingByTutor = (opt) => {
    const {studentId, lecturerId} = opt;
    const getParams = {
        headers: axiosGetHeaders,
        params: {
            studentId,
            lecturerId
        },
    };

    return axios.get(`${config.baseURL}session/booking/search`, getParams);
};