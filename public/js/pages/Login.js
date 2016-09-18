import React from 'react';
import { browserHistory, Link, withRouter } from 'react-router'
import { registerFirebase, loginFirebase } from '../api/student.api';
import config from '../../config/config';
import {materialLoading} from '../material-motion/material-motion';


class Login extends React.Component {

    componentWillMount(){
        document.title = `Login${config.titleEnding}`;

    }

    handleSubmit(e) {
        e.preventDefault();
        var email = this.emailField.value;
        var password = this.passwordField.value;

        /*Enable loading*/
        materialLoading({elm: '.container-login', enable: true});

        loginFirebase({
            email: email,
            password: password
         }).
         then((body) => {
            console.log(body);
            this.props.router.push('/');
            materialLoading({elm: '.container-login', enable: false});
         }).
         catch((err) => {
            console.log(err);
            materialLoading({elm: '.container-login', enable: false});
         });
    }

    render() {
        return (
            <div id="PageContent">

                <div class="container-login">
                    <div>
                        <h2>Student Login</h2>
                        <div>Login to register for workshops, programs, and appointments</div>
                    </div>

                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div class="form-group">
                            <label>uts student id</label>
                            <input type="text" class="form-control" ref={(c) =>{this.emailField = c}} placeholder="Email"  />
                        </div>

                        <div class="form-group">
                            <label>uts password</label>
                            <input type="password" class="form-control" ref={(c) =>{this.passwordField = c}} placeholder="Password"  />
                        </div>

                        <div>
                            <p><b>Hint</b>: this is the same password you use to login to your UTS student email</p>
                            <p>Demo username: demo@student.uts.edu.au / password: test123</p>
                        </div>

                        <div class="register-now-row">
                            <Link to="/register">Don't have an account? Register now.</Link>
                        </div>

                        <button class="button-red" type="submit">login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);