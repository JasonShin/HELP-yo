import config from '../../config/config';
const axios = require('axios');
const headers = {
    'AppKey': config.appKey,
    'Accept': 'application/json'
};

export const listCampuses = (opts) => {
  const { active } = opts;
  return axios.get(`${config.baseURL}misc/campus/${active}`, { headers, });
};

export const listLecturers = (opts) => {
  const { active } = opts;
  return axios.get(`${config.baseURL}misc/lecturer/${active}`, { headers, });
};

export const listAppointments = (opts) => {
  const { active } = opts;
  return axios.get(`${config.baseURL}misc/appointment/${active}`, { headers, });
};

export const listAssignments = (opts) => {
  const { active } = opts;
  return axios.get(`${config.baseURL}misc/assignment/${active}`, { headers, });
};