import {chai, assert} from 'chai';
import FirebaseAPI from '../../public/js/api/firebase.api';
import {registerHELP, registerFirebase, loginFirebase} from '../../public/js/api/student.api';

//TO-DO: ADD SHOULD ASSERTIONS INSTEAD OF LOGGING TO CONSOLE
describe('Registering as a student', function(){
    this.timeout(20000);

    beforeEach(() => {
        //Nothing to do here
    });

    it('should fail at registering as a student Jason Shin', async () => {
        const response = await registerHELP({
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
        });
    });

    it('should fail creating user in firebase', async () => {
        const response = await registerFirebase({
            email: 'jasonshin8123@yoghu.com.au',
            password: 'giewjgi'
        });
    });

    it('should register to firebase', async () => {
        const response = await registerFirebase({
            email: 'jasonshin8123@yoghu.com.au',
            password: 'giewjgi'
        });
    });

    it('should login as yong.j.shin@help.com.au', async () => {
        const response = await loginFirebase({
            email: 'yong.j.shin@help.com.au',
            password: 'test123'
        });
    });

    after(() => {

    });
});