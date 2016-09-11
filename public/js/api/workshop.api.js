import config from '../../config/config';
const axios = require('axios');
const headers = {
    'AppKey': config.appKey,
    'Accept': 'application/json'
};

export const listWorkshopSets = (opts) => {
  const { active } = opts;
  return axios.get(`${config.baseURL}workshop/workshopSets/${active}`, { headers, });
};

export const createWorkshopBooking = (opts) => {
  const { workshopId, studentId, userId } = opts;
  const params = {
    workshopId,
    studentId,
    userId,
  };
  return axios.post(`${config.baseURL}workshop/booking/create`, {}, { headers, params, });
};

export const createWorkshopWaiting = (opts) => {
  const { workshopId, studentId, userId } = opts;
  const params = {
    workshopId,
    studentId,
    userId,
  };
  return axios.post(`${config.baseURL}workshop/wait/create`, {}, { headers, params, });
};

export const cancelWorkshopBooking = (opts) => {
  const { workshopId, studentId, userId } = opts;
  const params = {
    workshopId,
    studentId,
    userId,
  };
  return axios.post(`${config.baseURL}workshop/booking/cancel`, {}, { headers, params, });
};

export const searchWorkshopBookings = (opts) => {
  const { studentId, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd, campusId, active, page, pageSize } = opts;
  const params = {
    studentId,
    startingDtBegin,
    startingDtEnd,
    endingDtBegin,
    endingDtEnd,
    campusId,
    active,
    age,
    pageSize,
  };
  return axios.get(`${config.baseURL}workshop/search`, { headers, params, });
};

export const searchWorkshops = (opts) => {
  const { workshopSetId, topic, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd, campusId, active, page, pageSize } = opts;
  const params = {
    workshopSetId,
    topic,
    startingDtBegin,
    startingDtEnd,
    endingDtBegin,
    endingDtEnd,
    campusId,
    active,
    page,
    pageSize,
  };
  return axios.get(`${config.baseURL}workshop/workshop/search`, { headers, params, });
};

export const updateWorkshopBooking = (opts) => {
  const { workshopId, studentId, canceled, attended, userId } = opts;
  return axios.put(`${config.baseURL}workshop/booking/update`, {
    workshopId,
    studentId,
    canceled,
    attended,
    userId
  }, { headers, });
};
