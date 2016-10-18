import FirebaseAPI from './firebase.api';
import config from '../../config/config';
const axios = require('axios');
const headers = {
  'AppKey': config.appKey,
  'Accept': 'application/json'
};

export const createWorkshop = (opts) => {
  return new Promise((resolve, reject) => {

    var params = {
      headers: {
        'AppKey': config.appKey,
        "content-type": "application/json"
      },
      data: JSON.stringify(opts)
    };

    axios.post(config.createWorkshopURL, {params}).
        then((response) => {
          resolve(response);
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

export const searchWorkshopByIdFirebase = (opts) => {
  const {workshopId} = opts;
  console.log('INFO: finding workshopID ' , workshopId);
  var workshopRef = FirebaseAPI.context.database().ref('/workshops/'+workshopId);

  return new Promise( (resolve, reject) => {
    workshopRef.on('value', (snapshot) => {
      var data = snapshot.val();
      if(data !== null && data !== undefined) {
        resolve(data);
      } else {
        reject();
      }
    });
  } )
};

export const searchWorkshopsFirebase = (opts) => {
  const { workshopId, workshopSetId, topic, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd, campusId, active, page, pageSize } = opts;
  var workshopRef = FirebaseAPI.context.database().ref('/workshops/');
  var workshopSetIdRef = workshopRef.orderByChild("workshopSetID").equalTo(parseInt(workshopSetId))
      .limitToLast(10);

  return new Promise((resolve, reject) => {
    workshopSetIdRef.on('value', (snapshot) => {
      var data = snapshot.val();
      if(data !== undefined) {
        resolve(data);
      } else {
        reject();
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
