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
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}session/sessionTypes/true`, {},axiosConfig)
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};