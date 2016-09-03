import {chai, assert} from 'chai';
var jsdom = require('mocha-jsdom'); // This is necessary for testing jQuery in Mocha
jsdom();                            //Initiate jsdom
import {register} from '../../public/js/api/student/StudentAPI';
import config from '../../public/config/config';

const request = require('request');

describe('Registering as a student', function(){
    this.timeout(300000);

    before(() => {

    });

    it('should fail at registering as a student Jason Shin', function(done){
        console.log('testing ajax features');
        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
            done();
          } else {
            console.log(error);
            done(error);
          }
        }

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

    after(() => {

    });
});