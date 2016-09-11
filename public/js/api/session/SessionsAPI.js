import config from '../../../config/config';
const request = require('superagent');

export const getAllSessionsTypes = () => {
    return new Promise((resolve, reject) => {

        const callback = (error, response) => {
            if(!error && response.statusCode == 200) {
                resolve('resolved all sessions types! ', JSON.stringify(response));
            } else {
                reject('could not resolve all session types!' , JSON.stringify(error));
            }
        };

        request
            .get(`${config.baseURL}session/sessionTypes/true`)
            .set('AppKey', config.appKey)
            .set('Accept', 'application/json')
            .end(callback);

    });
};