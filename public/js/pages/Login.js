import React from 'react';
import { browserHistory, Link, withRouter } from 'react-router'
import { registerFirebase, loginFirebase } from '../api/student.api';
import config from '../../config/config';
import {materialLoading} from '../material-motion/material-motion';
import Spinner from '../components/Spinner';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Login extends React.Component {

    componentWillMount(){
        document.title = `Login${config.titleEnding}`;

        this.state = {
            enableSpinner: false
        };

    }

    handleSubmit(e) {
        e.preventDefault();
        var email = this.emailField.value;
        var password = this.passwordField.value;

        this.setState({
            enableSpinner: true
        });

        loginFirebase({
            email: email,
            password: password
         }).
         then((body) => {
            console.log(body);
            this.setState({
                enableSpinner: false
            });
            this.props.router.push('/workshopSets');
         }).
         catch((err) => {
            console.log(err);
            this.setState({
                enableSpinner: false
            });
         });
    }

    render() {

        const {enableSpinner} = this.state;

        return (
            <ReactCSSTransitionGroup 
              transitionName="page-transition"
              transitionAppear={true}
              transitionAppearTimeout={800}
              transitionEnterTimeout={800}>
                <div id="PageContent">

                    <div class="container-login container-small">

                        <Spinner visible={enableSpinner} />

                        <div class='login-header'>
                            <h2>Student Login</h2>
                            <div>Login to register for workshops, programs, and appointments</div>
                        </div>

                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div class="form-group">
                                <input type="text" class="form-control" ref={(c) =>{this.emailField = c}} required />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>uts student email</label>
                            </div>

                            <div class="form-group">
                                <input type="password" class="form-control" ref={(c) =>{this.passwordField = c}} required />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>uts password</label>
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
            </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(Login);