import * as firebase from 'firebase';
import * as firebaseConfig from '../../config/firebase.config';

export default class FirebaseAPI {
    static init = false;

    static constructor() {
        console.log('initialized!');
        this.initialize();
    }

    static initialize() {
        //TODO: Find a way to validate firebase has initialized.
        //Possible issues => firebase context timeout
        console.log('calling!');
        if(this.init === false) {

            firebase.initializeApp(firebaseConfig);
            this.init = true;
        }
    }

    // () => retreives initialized firebase context. Does not initiate already initiated context.
    static get context () {
        console.log('calling!');
        this.initialize();
        window.firebase = firebase;
        return firebase;
    }

    static getAuth() {

    }

    // () => returns authenticated status
    static requireAuth(nextState, replace) {

        if(null === firebase.auth().currentUser) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    }

}