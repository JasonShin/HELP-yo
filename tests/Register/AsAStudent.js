import {chai, assert} from 'chai';
import {register} from '../../public/js/api/student/StudentAPI';

describe('Registering as a student', function(){
    this.timeout(20000);

    before(() => {

    });

    it('should fail at registering as a student Jason Shin', function(done){
        register({
            studentId: '123456',
            dob: '1 January 1995',
            degreeType: 'UG',
            studentStatus: 'International',
            firstLang: 'English',
            countryOrigin: 'Australia',
            creatorId: '123456',
            gender: 'M',
            background: 'Degree',
            degreeDetails: '1st',
            altContact: '0405294958',
            preferredName: 'Tom',
            completedHsc: 'true',
            hscMark: '100'
        })
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