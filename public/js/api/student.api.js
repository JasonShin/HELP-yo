import config from '../../config/config';
import FirebaseAPI from './firebase.api';
const axios = require('axios');
const axiosConfig = {
  headers: {
    'AppKey': config.appKey,
    'Accept': 'application/json'
  }
};

export const registerHELP = (opts) => {
    const { studentId, dob, degreeType, studentStatus, firstLang, countryOrigin, creatorId,
      gender, background, degreeDetails, altContact, preferredName, completedHsc, hscMark, 
      completedIelts, ieltsMark, completedToefl, toeflMark, completedTafe, tafeMark, completedCult,
      cultMark, completedInsearchDeep, insearchDeepMark, completedInsearchDiploma, insearchDiplomaMark,
      completedFoundationCourse, foundationCourseMark } = opts;

    if (!studentId || !dob || !degreeType || !studentStatus || !firstLang || !countryOrigin || !creatorId) {
      throw new Error('[Register] Required parameter not included. Check REST docs for required parameters.');
    }

    return new Promise((resolve, reject) => {
      axios.post(`${config.baseURL}student/register`,
      {
        'StudentId': studentId,
        'DateOfBirth': dob,
        'Degree': degreeType,
        'Status':  studentStatus,
        'FirstLanguage': firstLang,
        'CountryOrigin': countryOrigin,
        'CreatorId': creatorId,
        'Gender': gender,
        'Background': background,
        'DegreeDetails': degreeDetails,
        'AltContact': altContact,
        'PreferredName': preferredName,
        'HSC': completedHsc,
        'HSCMark': hscMark,
        'IELTS': completedIelts,
        'IELTSMark': ieltsMark,
        'TOEFL': completedToefl,
        'TOEFLMark': toeflMark,
        'TAFE': completedTafe,
        'TAFEMark': tafeMark,
        'CULT': completedCult,
        'CULTMark': cultMark,
        'InsearchDEEP': completedInsearchDeep,
        'InsearchDEEPMark': insearchDeepMark,
        'InsearchDiploma': completedInsearchDiploma,
        'InsearchDiplomaMark': insearchDiplomaMark,
        'FoundationCourse': completedFoundationCourse,
        'FoundationCourseMark': foundationCourseMark,
      }, axiosConfig)
      .then((val) => {
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