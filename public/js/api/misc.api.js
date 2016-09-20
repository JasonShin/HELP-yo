import config from '../../config/config';
const axios = require('axios');
const headers = {
    'AppKey': config.appKey,
    'Accept': 'application/json'
};

export const listCampuses = (opts) => {
  const { active } = opts;
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}misc/campus/${active}`, { headers, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

export const listLecturers = (opts) => {
  const { active } = opts;
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}misc/lecturer/${active}`, { headers, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

export const listAppointments = (opts) => {
  const { active } = opts;
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}misc/appointment/${active}`, { headers, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

export const listAssignments = (opts) => {
  const { active } = opts;
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}misc/assignment/${active}`, { headers, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};