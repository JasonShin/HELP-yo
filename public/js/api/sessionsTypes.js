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