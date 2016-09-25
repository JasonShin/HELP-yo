import config from '../../config/config';
const axios = require('axios');
const headers = {
  'AppKey': config.appKey,
  'Accept': 'application/json'
};

export const listWorkshopSets = async (active) => {

  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}workshop/workshopSets/${active}`, { headers, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

export const createWorkshopBooking = (opts) => {
  const { workshopId, studentId, userId } = opts;
  const params = {
    workshopId,
    studentId,
    userId,
  };
  return new Promise((resolve, reject) => {
    axios.post(`${config.baseURL}workshop/booking/create`, {}, { headers, params, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

export const createWorkshopWaiting = (opts) => {
  const { workshopId, studentId, userId } = opts;
  const params = {
    workshopId,
    studentId,
    userId,
  };
  return new Promise((resolve, reject) => {
    axios.post(`${config.baseURL}workshop/wait/create`, {}, { headers, params, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

export const cancelWorkshopBooking = (opts) => {
  const { workshopId, studentId, userId } = opts;
  const params = {
    workshopId,
    studentId,
    userId,
  };
  return new Promise((resolve, reject) => {
    axios.post(`${config.baseURL}workshop/booking/cancel`, {}, { headers, params, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
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
    page,
    pageSize,
  };
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}workshop/search`, { headers, params, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

/*

 workshopSetId
 topic
 startingDtBegin
 startingDtEnd
 endingDtBegin
 endingDtEnd
 campusId
 active
 page
 pageSize
 */

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
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}workshop/search`, { headers, params, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        console.log(val.DisplayMessage);
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

export const updateWorkshopBooking = (opts) => {
  const { workshopId, studentId, canceled, attended, userId } = opts;
  const payload = { 
    workshopId,
    studentId,
    canceled,
    attended,
    userId 
  };
  return new Promise((resolve, reject) => {
    axios.put(`${config.baseURL}workshop/booking/update`, payload, { headers, })
    .then((val) => {
      if (val.IsSuccess === 'false') {
        reject(val.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};
