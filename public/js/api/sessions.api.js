import config from '../../config/config';
const axios = require('axios');
const axiosGetHeaders = {
    'AppKey': config.appKey,
    'Accept': 'application/json'
};

//TODO: implement generic search function that accepts all of the below params

export const searchSessionBookingsByDate = (opt) => {
  const {studentId, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd} = opt;
  const getParams = {
    headers: axiosGetHeaders,
    params: {
        studentId,
        startingDtBegin,
        startingDtEnd,
        endingDtBegin,
        endingDtEnd
    }
  };
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}session/booking/search`, getParams)
    .then((val) => {
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};


//(studentId, sessionTypeId) => filtered sessions  topic = session type
export const searchSessionBookingsByTopic = (studentId, sessionTypeId) => {
  const getParams = {
    headers: axiosGetHeaders,
    params: {
        studentId,
        sessionTypeId
    },
  };
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}session/booking/search`, getParams)
    .then((val) => {
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });

};

export const searchSessionBookingByLocation = (opt) => {
  const {studentId, campus} = opt;
  const getParams = {
    headers: axiosGetHeaders,
    params: {
        studentId,
        campus
    },
  };
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}session/booking/search`, getParams)
    .then((val) => {
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};

export const searchSessionBookingByTutor = (opt) => {
  const {studentId, lecturerId} = opt;
  const getParams = {
    headers: axiosGetHeaders,
    params: {
        studentId,
        lecturerId
    },
  };
  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}session/booking/search`, getParams)
    .then((val) => {
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
      } else {
        resolve(val);
      }
    });
  });
};