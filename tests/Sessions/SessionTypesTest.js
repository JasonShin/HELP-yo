import {chai, assert} from 'chai';
import HELPFirebase from '../../public/js/api/firebase.api';
import {getAllSessionsTypes} from '../../public/js/api/sessions.api';


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