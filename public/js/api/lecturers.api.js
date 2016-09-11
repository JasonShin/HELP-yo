import config from '../../config/config';
const axios = require('axios');
const axiosConfig = {
    headers: {
        'AppKey': config.appKey,
        'Accept': 'application/json'
    }
};

//TODO: Implement tutor API call
export const getAllLecturers = () => {

    return axios.get(`${config.baseURL}session/sessionTypes/true`, {},axiosConfig);
};