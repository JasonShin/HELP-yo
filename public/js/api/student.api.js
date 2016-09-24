import config from '../../config/config';
import FirebaseAPI from './firebase.api';
const axios = require('axios');
const axiosConfig = {
  headers: {
    'AppKey': config.appKey,
    'Accept': 'application/json'
  }
};

/*
 "StudentId" : "123456", // required
 "DateOfBirth" : "1 January 1995",
 "Gender" : "M", // optional
 "Degree" : "UG", // required
 "Status" : "International", // required
 "FirstLanguage" : "English", // required
 "CountryOrigin" : "Australia", // required
 "Background" : "Degree", // optional
 "DegreeDetails" : "1st", // optional
 "AltContact" : "0405294958", // optional
 "PreferredName" : "Tom", // optional
 "HSC" : "true", // optional
 "HSCMark" : "100", // optional
 "IELTS" : "false", // optional
 "IELTSMark" : "", // optional
 "TOEFL" : "false", // optional
 "TOEFLMark" : "", // optional
 "TAFE" : "false", // optional
 "TAFEMark" : "", // optional
 "CULT" : "false", // optional
 "CULTMark" : "", // optional
 "InsearchDEEP" : "false", // optional
 "InsearchDEEPMark" : "", // optional
 "InsearchDiploma" : "false", // optional
 "InsearchDiplomaMark" : "", // optional
 "FoundationCourse" : "false", // optional
 "FoundationCourseMark" : "", // optional
 "CreatorId" : "123456" // required

 */

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