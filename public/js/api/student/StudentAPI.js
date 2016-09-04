import config from '../../../config/config';
//import * as firebase from 'firebase';
import HELPFirebase from '../HELPFirebase';
const request = require('request');

export const registerHELP = (opts) => {
  return new Promise((resolve, reject) => {
    const { studentId, dob, degreeType, studentStatus, firstLang, countryOrigin, creatorId,
      gender, background, degreeDetails, altContact, preferredName, completedHsc, hscMark, 
      completedIelts, ieltsMark, completedToefl, toeflMark, completedTafe, tafeMark, completedCult,
      cultMark, completedInsearchDeep, insearchDeepMark, completedInsearchDiploma, insearchDiplomaMark,
      completedFoundationCourse, foundationCourseMark } = opts;

    const callback = (error, response, body) => {

      if (!error && response.statusCode == 200) {
        resolve('hello! ' + JSON.stringify(response) + 'yo');
      } else {
        reject('o no! ' + JSON.stringify(error) + '  yoa');
      }
    };

    if (!studentId || !dob || !degreeType || !studentStatus || !firstLang || !countryOrigin || !creatorId) {
      reject('[Register] Required parameter not included. Check REST docs for required parameters.');
    }

    const options = {
      url: `${config.baseURL}student/register`,
      method: 'POST',
      headers: {
        'AppKey': config.appKey
      },
      json: true,
      body: {
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
      }
    };
    request(options, callback);
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
      resolve(error);
    });
  });

};