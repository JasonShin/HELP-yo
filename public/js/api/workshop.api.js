import config from '../../config/config';
import FirebaseAPI from '../api/firebase.api';
const axios = require('axios');
const headers = {
  'AppKey': config.appKey,
  'Accept': 'application/json'
};

export const listWorkshopSets = async (active) => {

  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}workshop/workshopSets/${active}`, { headers, })
    .then((val) => {
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

/* WorkshopBookings FIREBASE STARTS */
export const createWorkshopBookingFirebase = (opts) => {

  const { workshopId, studentId, userId } = opts;
  const params = {
    workshopId,
    studentId,
    userId,
  };


  FirebaseAPI.context.database().ref('/workshopBookings/' + workshopId).set({
    workshopId,
    studentId,
    userId
  });
};

export const deleteWorkshopBookingFirebase = (opts) => {

  const { workshopId} = opts;
  const params = {
    workshopId
  };


  FirebaseAPI.context.database().ref('/workshopBookings/' + workshopId).remove();
};

export const getWorkshopBookingFirebase = (opts) => {
  const { workshopId } = opts;
  const params = {
    workshopId
  };
  console.log('searching for! ' , workshopId);
  return FirebaseAPI.context.database().ref('/workshopBookings').orderByChild("workshopId").equalTo(workshopId);
};
/* WorkshopBookings FIREBASE ENDS */

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
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
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
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
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
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
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
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};


export const searchWorkshops = (opts) => {
  const { workshopId, workshopSetId, topic, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd, campusId, active, page, pageSize } = opts;
  const params = {
    workshopId,
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
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
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
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};
