import config from '../../config/config';
const axios = require('axios');

const axiosHeader = {
    'AppKey': config.appKey,
    'Accept': 'application/json'
};

//() => retrieves first page session types data
export const getAllSessionsTypes = () => {
    const getParams = {
        headers: axiosHeader,

    };

    //Todo: find out how to resolve or reject. HELP API does not send correct code and axios doesn't know how to catch errors. Everything is success
    return axios.get(`${config.baseURL}session/sessionTypes/true`, getParams);
};
