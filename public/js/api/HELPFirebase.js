import * as firebase from 'firebase';
import * as firebaseConfig from '../../config/firebase.config';

export default class HELPFirebase {
    static init = false;


    static initialize() {
        //TODO: Find a way to validate firebase has initialized.
        //Possible issues => firebase context timeout
        if(this.init === false) {
            firebase.initializeApp(firebaseConfig);
            this.init = true;
        }
    }

    // () => retreives initialized firebase context. Does not initiate already initiated context.
    static get context () {
        this.initialize();
        return firebase;
    }
}