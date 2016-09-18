import React from 'react';
import {ReactRouter, Router, Link, withRouter} from 'react-router';
import FirebaseAPI from '../api/firebase.api';
import {logoutFirebase} from '../api/student.api';

class PrimaryNav extends React.Component {

    constructor() {
        super();

        //Setting initial state null ensures no Login flicker
        this.state = {
            loggedIn: null
        };
    }


    componentWillMount() {

        //Get Firebase Auth state
        FirebaseAPI.context.auth().onAuthStateChanged(firebaseUser => {

            this.setState({
                loggedIn: (null !== firebaseUser)
            });

            if (firebaseUser) {
                console.log("Logged IN", firebaseUser);
            } else {
                console.log('Not logged in');
            }
        });
    }

    handleLoginUser() {
        console.log('login pressed!');
        this.props.router.push('/login');
    }

    handleLogoutUser() {
        logoutFirebase();
        this.props.router.push('/');
    }

    render() {

        var authButton = '';

        if(this.state.loggedIn !== null) {
            if(this.state.loggedIn === false) {
                authButton = (<span class="auth-button-login" onClick={this.handleLoginUser.bind(this)}><i class="fa fa-sign-in" aria-hidden="true"></i>Login</span>);
            } else {
                authButton = (<span class="auth-button-logout" onClick={this.handleLogoutUser.bind(this)}>Logout</span>);
            }
        }

        return (
            <div id='PrimaryNav'>

                <div class="logo">
                    <div class="logo-container">
                        <Link to="/">
                            <span class="logo-image"><img src="https://firebasestorage.googleapis.com/v0/b/helps-uts-project.appspot.com/o/UTS-logo.png?alt=media&token=df24fd5f-1c18-46d6-bb89-6e83cf47609f" alt="logo" /></span>
                            <span class="logo-text">UTS:HELPS</span>
                        </Link>
                    </div>
                </div>
                <div class="menu-container">
                    <div class="menu-main-container">
                        <ul>
                            <li class="motion-ripple-button">workshops</li>
                            <li><Link to="/bookings/history">my bookings</Link></li>
                            <li>my info</li>
                            <li>faq's</li>
                            <li>{authButton}</li>
                        </ul>
                    </div>
                    <div class="menu-sub-container">

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PrimaryNav);