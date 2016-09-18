import {chai, assert} from 'chai';
import {searchSessionBookingsByDate, searchSessionBookingsByLocation} from '../../public/js/api/sessions.api';
import {getAllSessionsTypes} from '../../public/js/api/sessionsTypes.api';

describe('Retreiving session types', function() {
    this.timeout(20000);


    it('should retreive all session types with success code', (done) => {
        getAllSessionsTypes().
            then(function(e) {
                console.log("success!");
                console.log(e);
                done();
            });
            /*then((response) => {
                console.log(response.data);
                done();
            }).
            catch((error) => {
                console.log(error);
                done();
            });*/
    });

});