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

    // () => returns authenticated status
    static requireAuth(nextState, replace, callback) {
        FirebaseAPI.initialize();
        FirebaseAPI.context.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                //When user is authenticated from Firebase
                callback();
            } else {
                replace({
                    pathname: '/login',
                    state: { nextPathname: nextState.location.pathname }
                });
            }
        });

    }

}