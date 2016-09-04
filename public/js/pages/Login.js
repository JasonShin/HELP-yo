import React from 'react';
import TodoList from '../components/TodoList';
import TodoStore from '../stores/TodoStore';

//import {registerFirebase,loginFirebase} from '../api/student/StudentAPI';

export default class Login extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        var email = this.emailField.value;
        var password = this.passwordField.value;



        /*loginFirebase({
            email: email,
            password: password
         }).
         then((body) => {
            console.log(body);
            this.context.router.replace('/');
         }).
         catch((err) => {
            console.log(err);
         });*/
    }

    render() {
        return (
            <div>
                <h1>You must login to goto any other pages!</h1>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div class="form-group">
                        <label>Email</label>
                        <input class="form-control" ref={(c) =>{this.emailField = c}} placeholder="Email"  />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" ref={(c) =>{this.passwordField = c}} placeholder="Password"  />
                    </div>

                    <button type="submit">Login yo</button>
                </form>

            </div>
        );
    }
}