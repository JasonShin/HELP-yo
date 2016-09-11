import config from '../../../config/config';
import HELPFirebase from '../HELPFirebase';
const request = require('superagent');

export const registerHELP = (opts) => {
  return new Promise((resolve, reject) => {
    const { studentId, dob, degreeType, studentStatus, firstLang, countryOrigin, creatorId,
      gender, background, degreeDetails, altContact, preferredName, completedHsc, hscMark, 
      completedIelts, ieltsMark, completedToefl, toeflMark, completedTafe, tafeMark, completedCult,
      cultMark, completedInsearchDeep, insearchDeepMark, completedInsearchDiploma, insearchDiplomaMark,
      completedFoundationCourse, foundationCourseMark } = opts;

    const callback = (error, response) => {

      if (!error && response.statusCode == 200) {
        resolve('hello! ' + JSON.stringify(response) + 'yo');
      } else {
        reject('o no! ' + JSON.stringify(error) + '  yoa');
      }
    };

    if (!studentId || !dob || !degreeType || !studentStatus || !firstLang || !countryOrigin || !creatorId) {
      reject('[Register] Required parameter not included. Check REST docs for required parameters.');
    }

    request
      .post(`${config.baseURL}student/register`)
      .send({
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
      })
      .set('AppKey', config.appKey)
      .set('Accept', 'application/json')
      .end(callback);
  });
};

export const registerFirebase = (opts) => {

  return new Promise((resolve, reject) => {

    const { email, password } = opts;

    HELPFirebase.context.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          resolve('successfully registered');
        })
        .catch((error) => {
          reject({
            errorCode: error.code,
            errorMessage: error.message
          });
        });
  });

};

export const loginFirebase = (opts) => {

  return new Promise((resolve, reject)=> {

    const {email, password} = opts;

    HELPFirebase.context.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
      resolve(result);
    })
    .catch(function(error) {
      reject(error);
    });
  });

};