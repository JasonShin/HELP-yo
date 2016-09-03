import {chai, assert} from 'chai';
var jsdom = require('mocha-jsdom'); // This is necessary for testing jQuery in Mocha
jsdom();                            //Initiate jsdom
import {register} from '../../public/js/api/student/StudentAPI';


describe('Registering as a student', function(){
    this.timeout(300000);

    before(() => {

    });

    it('should fail at registering as a student Jason Shin', (done) => {

        register()
            .then((data) => {
                console.log('succes: ' , data);
                done();
            })
            .catch((data) => {
                console.log('error: ' , data);
                done();
            });
    });

    after(() => {

    });
});