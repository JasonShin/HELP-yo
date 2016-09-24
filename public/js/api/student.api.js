import config from '../../config/config';
import FirebaseAPI from './firebase.api';
const axios = require('axios');
const axiosConfig = {
  headers: {
    'AppKey': config.appKey,
    'Accept': 'application/json'
  }
};

//() => first raw of params = required, others = optional
export const registerHELPNew = (
    StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId,
    Gender, Background, DegreeDetails, AltContact, Preferred, HSC, HSCMark, IELTS, IELTSMark, TAFE, TAFEMark,
    CULT, CULTMark, InsearchDEEP, InsearchDEEPMark, InsearchDiploma, InsearchDiplomaMark,
    FoundationCourse, FoundationCourseMark
) => {

    //TODO: Optimise this so it tells exactly what is wrong (what params is missing)
    if (!StudentId || !DateOfBirth || !Degree || !Status || !FirstLanguage || !CountryOrigin || !CreatorId) {
        throw new Error('Missed out on a required param');
    }

    //TODO: Please find if this is the only way to throw an error about HTTP request failed while interacting with HELP API
    return new Promise((resolve, reject) => {
      axios.post(`${config.baseURL}student/register`,{
        StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId,
        Gender, Background, DegreeDetails, AltContact, Preferred, HSC, HSCMark, IELTS, IELTSMark, TAFE, TAFEMark,
        CULT, CULTMark, InsearchDEEP, InsearchDEEPMark, InsearchDiploma, InsearchDiplomaMark,
        FoundationCourse, FoundationCourseMark
      }, axiosConfig).then((val) => {
        if (val.IsSuccess === 'false') {
          reject(val.DisplayMessage);
        } else {
          resolve(val);
        }
      });
    });
};


export const registerFirebase = (opts) => {
  const { email, password } = opts;
  return FirebaseAPI.context.auth().createUserWithEmailAndPassword(email, password);
};

export const loginFirebase = (opts) => {
  const { email, password } = opts;
  return FirebaseAPI.context.auth().signInWithEmailAndPassword(email, password);
};

export const logoutFirebase = (opts) => {
  return FirebaseAPI.context.auth().signOut();
};