import {chai, assert} from 'chai';
var jsdom = require('mocha-jsdom'); // This is necessary for testing jQuery in Mocha
jsdom();                            //Initiate jsdom
import {register} from '../../public/js/api/student/StudentAPI';

describe('Registering as a student', function(){
    this.timeout(300000);

    before(() => {

    });

    it('should fail at registering as a student Jason Shin', function(done){
        console.log('testing ajax features');
        register()
            .then((body) => {
                console.log(body);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    after(() => {

    });
});