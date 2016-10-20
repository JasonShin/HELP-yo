import FirebaseAPI from './firebase.api';
import config from '../../config/config';
import { parseEmailForFirebase } from '../tools/Helpers';
const axios = require('axios');
const headers = {
  'AppKey': config.appKey,
  'Accept': 'application/json'
};

export const createWorkshop = (opts) => {
  const { id: workshopId } = opts;
  return new Promise((resolve, reject) => {
    var workshopRef = FirebaseAPI.context.database().ref('/workshops/'+workshopId).set(opts, (error) => {
        if(error) {
            reject(error);
        } else {
            resolve('Successfully create workshop!');
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

export const searchWorkshopByIdFirebase = (opts) => {
  const {workshopId} = opts;
  console.log('INFO: finding workshopID ' , workshopId);
  var workshopRef = FirebaseAPI.context.database().ref('/workshops/'+workshopId);

  return new Promise((resolve, reject) => {
    workshopRef.on('value', (snapshot) => {
      var data = snapshot.val();
      if(data !== null && data !== undefined) {
        resolve(data);
      } else {
        reject();
      }
    });
  });
};

export const updateWorkshop = (opts) => {
    const { workshopId } = opts;
    FirebaseAPI.context.database().ref('/workshops/'+workshopId).update(opts);
};


export const searchWorkshopsFirebase = (opts) => {
  const { workshopId, workshopSetId, topic, startingDtBegin, startingDtEnd, endingDtBegin, endingDtEnd, campusId, active, page, pageSize } = opts;
  var workshopRef = FirebaseAPI.context.database().ref('/workshops/');
  var workshopSetIdRef = workshopRef.orderByChild("workshopSetID").equalTo(parseInt(workshopSetId))
      .limitToLast(100);

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

export const getWaitlistByWorkshop = (opts) => {
  const { workshopId } = opts;
  var waitlistRef = FirebaseAPI.context.database().ref('/waitlists/'+ workshopId);
  return new Promise((resolve, reject) => {
    waitlistRef.on('value', (snapshot) => {
      var data = snapshot.val();
      if(data !== null && data !== undefined) {
        resolve(data);
      } else {
        reject();
      }
    });
  });
};

export const addToWaitlist = (opts) => {
  const { workshopId, email } = opts;
  var waitlistRef = FirebaseAPI.context.database().ref('/waitlists/'+ workshopId);
  let max = 0;
  waitlistRef.on('value', (snapshot) => {
    var data = snapshot.val();
    if(data !== null && data !== undefined) {
      for (const key of Object.keys(data)) {
        const position = data[key];
        if (position > max) {
          max = position;
        }
      }
    }
  });
  FirebaseAPI.context.database().ref('/waitlists/' + workshopId).set({
    [parseEmailForFirebase(email)]: max + 1,
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
