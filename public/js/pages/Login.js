import React from 'react';
import { browserHistory, withRouter } from 'react-router'
import TodoList from '../components/TodoList';
import TodoStore from '../stores/TodoStore';
import { registerFirebase, loginFirebase } from '../api/student.api';
import config from '../../config/config';


class Login extends React.Component {

    componentWillMount(){
        document.title = `Login${config.titleEnding}`;
    }

    handleSubmit(e) {
        e.preventDefault();
        var email = this.emailField.value;
        var password = this.passwordField.value;

        loginFirebase({
            email: email,
            password: password
         }).
         then((body) => {
            console.log(body);
            this.props.router.push('/');
         }).
         catch((err) => {
            console.log(err);
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
                        </div>

                        <button class="button-red" type="submit">login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);