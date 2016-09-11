import {chai, assert} from 'chai';
import HELPFirebase from '../../public/js/api/HELPFirebase';
import {getAllSessionsTypes} from '../../public/js/api/session/SessionsAPI';


describe('Retreiving session types', function() {
    this.timeout(20000);

    it('should retrieve all sessions types', function() {
        getAllSessionsTypes()
            .then((body) => {
                console.log(body);
            })
            .catch((err) => {
                console.log(err);
            });
    });
});