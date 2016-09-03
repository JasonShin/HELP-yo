import config from '../../../config/config';
const request = require('request');

export const register = () => {
    return new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
          if (!error && response.statusCode == 200) {
            resolve('hello! ' + JSON.stringify(response) + 'yo');
          } else {
            reject('o no! ' + JSON.stringify(error) + "  yoa");
          }
        };

        const options = {
          url: 'http://52.63.224.1/api/student/register',
          method: 'POST',
          headers: {
            'AppKey': config.appKey
          },
          json: true,
          body: {
            'StudentId': '123456', // required
            'DateOfBirth': '1 January 1995',
            'Gender': 'M', // optional
            'Degree': 'UG', // required
            'Status': 'International', // required
            'FirstLanguage': 'English', // required
            'CountryOrigin': 'Australia', // required
            'Background': 'Degree', // optional
            'DegreeDetails': '1st', // optional
            'AltContact': '0405294958', // optional
            'PreferredName': 'Tom', // optional
            'HSC': 'true', // optional
            'HSCMark': '100', // optional
            'IELTS': 'false', // optional
            'IELTSMark': '', // optional
            'TOEFL': 'false', // optional
            'TOEFLMark': '', // optional
            'TAFE': 'false', // optional
            'TAFEMark': '', // optional
            'CULT': 'false', // optional
            'CULTMark': '', // optional
            'InsearchDEEP': 'false', // optional
            'InsearchDEEPMark': '', // optional
            'InsearchDiploma': 'false', // optional
            'InsearchDiplomaMark': '', // optional
            'FoundationCourse': 'false', // optional
            'FoundationCourseMark': '', // optional
            'CreatorId': '123456' // required
          }
        };
        request(options, callback);
    });
};
