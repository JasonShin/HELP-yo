import config from '../../config/config';
import FirebaseAPI from './firebase.api';
import {parseEmailForFirebase} from '../tools/Helpers';
const axios = require('axios');
const headers = {
  'AppKey': config.appKey,
  'Accept': 'application/json'
};

//() => first raw of params = required, others = optional
//TODO: Correct exceptions
export const setStudentProfile = (
    StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId,
    Gender, Background, DegreeDetails, AltContact, Preferred, HSC, HSCMark, IELTS, IELTSMark, TAFE, TAFEMark,
    CULT, CULTMark, InsearchDEEP, InsearchDEEPMark, InsearchDiploma, InsearchDiplomaMark,
    FoundationCourse, FoundationCourseMark
) => {

    const postParams = {
      headers,
    };

    //TODO: Optimise this so it tells exactly what is wrong (what params is missing)
    if (!StudentId || !DateOfBirth || !Degree || !Status || !FirstLanguage || !CountryOrigin || !CreatorId) {
        throw new Error('Missed out on a required param');
    }

    //TODO: Please find if this is the only way to throw an error about HTTP request failed while interacting with HELP API
    return new Promise((resolve, reject) => {
      axios.post(`${config.baseURL}student/register`, {
        StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId,
        Gender, Background, DegreeDetails, AltContact, Preferred, HSC, HSCMark, IELTS, IELTSMark, TAFE, TAFEMark,
        CULT, CULTMark, InsearchDEEP, InsearchDEEPMark, InsearchDiploma, InsearchDiplomaMark,
        FoundationCourse, FoundationCourseMark
      }, postParams).then((val) => {

        //NOTE: Setting profile on Firebase
        setStudentFirebaseProfile(StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId).
        then(
            () => {
              console.log('INFO: setting profile on HELP API');
              if (val.data.IsSuccess === 'false') {
                reject(val.data.DisplayMessage);
              } else {
                resolve(val);
              }
            }
        ).
        catch(
            () => {

            }
        );

      });
    });
};

export const setStudentFirebaseProfile = (
    StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId,
    Gender, Background, DegreeDetails, AltContact, Preferred, HSC, HSCMark, IELTS, IELTSMark, TAFE, TAFEMark,
    CULT, CULTMark, InsearchDEEP, InsearchDEEPMark, InsearchDiploma, InsearchDiplomaMark,
    FoundationCourse, FoundationCourseMark
) => {
      return new Promise((resolve, reject) => {
        FirebaseAPI.context.auth().onAuthStateChanged(firebaseUser => {

          let studentEmail = firebaseUser.email;
          let opt = {StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId};

          FirebaseAPI.context.database().ref('/students/' + parseEmailForFirebase(studentEmail)).set(opt);
          resolve();
        });
      });

    //
};

export const getStudentFirebaseProfile = (email) => {
    return FirebaseAPI.context.database().ref('/students/'+ parseEmailForFirebase(email));
};

export const getStudent = (opts) => {
  const { studentId } = opts;

  const getParams = {
    headers,
    params: {
      studentId,
    }
  };

  return new Promise((resolve, reject) => {
    axios.get(`${config.baseURL}student`, getParams)
    .then((val) => {
      if (val.data.IsSuccess === 'false') {
        reject(val.data.DisplayMessage);
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