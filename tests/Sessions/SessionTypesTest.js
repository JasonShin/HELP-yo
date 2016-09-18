import {chai, assert} from 'chai';
//import HELPFirebase from '../../public/js/api/firebase.api';
import {searchSessionBookingsByDate, searchSessionBookingsByLocation} from '../../public/js/api/sessions.api';


describe('Retreiving session types', function() {
    this.timeout(20000);


    it('should retreive all sessions from date from 2007-08-01T00:00:00 to 2007-08-10T00:00:00', async() => {

        const opt = {
            'studentId': '11610895',
            'startingDtBegin': '2007-08-01T00:00:00',
            'endingDtBegin': '2007-08-10T00:00:00'
        };



        const response = await searchSessionBookingsByDate(opt);
    });

    it('should retrieve all sessions of date from 2007-08-01T00:00:00 to 2007-08-10T00:00:00 and must have correct data', (done) => {
        const opt = {
            'studentId': '11610895',
            'startingDtBegin': '2007-08-01T00:00:00',
            'endingDtBegin': '2007-08-10T00:00:00'
        };

        searchSessionBookingsByDate(opt).
        then(function(response){
                console.log(response);
                console.log('success');
                done();
            }).
        catch(function(error){
            console.log(error);
            console.log('error');
            done();
        });

    });
});