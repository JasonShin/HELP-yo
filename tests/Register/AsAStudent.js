import {chai, assert} from 'chai';
import HELPFirebase from '../../public/js/api/HELPFirebase';
import {registerHELP, registerFirebase, loginFirebase} from '../../public/js/api/student/StudentAPI';

describe('Registering as a student', function(){
    this.timeout(20000);

    beforeEach(() => {
        //Nothing to do here
    });

    it('should fail at registering as a student Jason Shin', function(done){
        registerHELP({
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

    it('should fail creating user in firebase', (done)=> {
        registerFirebase({
            email: 'jasonshin8123@yoghu.com.au',
            password: 'giewjgi'
        })
            .then((body) => {
                console.log(body);
            })
            .catch((err)=>{
                console.log(err);
            });

        console.log('called!');
    });

    it('should register to firebase', (done)=>{
        registerFirebase({
            email: 'jasonshin8123@yoghu.com.au',
            password: 'giewjgi'
        })
        .then((body) => {
            console.log(body);
            done();
        })
        .catch((err)=>{
            console.log(err);
            done();
        });

    });

    it('should login as yong.j.shin@help.com.au', (done) => {
        loginFirebase({
            email: 'yong.j.shin@help.com.au',
            password: 'test123'
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