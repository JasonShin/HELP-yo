import React from 'react';
import { browserHistory, Link, withRouter } from 'react-router';
import { registerFirebase, loginFirebase } from '../api/student.api';
import config from '../../config/config';

import { DateField, Calendar } from 'react-date-picker';


class Register extends React.Component {


    componentWillMount(){
        document.title = `Register${config.titleEnding}`;

        //InitialState
        this.state = {
            passwordStrength: ''
        };
    }



    //TODO: Optimise this to make it more realistic
    onPasswordChange() {
        let passwordVal = this.password.value;
        let passwordLength = passwordVal.length;
        if(passwordLength > 0) {

            let color = 'black';
            if(passwordLength < 10) {
                color = 'red';
            } else if (passwordLength > 10 && passwordLength < 25) {
                color = 'rgba(173, 162, 0, 1)';
            } else {
                color = 'green';
            }

            var challengeStyle = {
                'color': color
            };

            this.setState({
                passwordStrength: (<span style={challengeStyle}>It would take {passwordLength / 10} min to hack your password</span>)
            });
        } else {
            this.setState({
                passwordStrength: ''
            });
        }

    }

    //() => on succes, sends to register profile page
    handleSubmit(e) {
        e.preventDefault();

        registerFirebase(
            {
                email: this.studentEmail.value,
                password: this.studentPassword.value
            }
        ).
        then((response) => {
            console.log('yoyo! success ' + response);
        }).
        catch((error) => {
            console.log('failed! ' + error);
        });

    }

    render() {

        const {passwordStrength} = this.state;



        return (
          <div id="PageContent">
              <div class="container-register">

                  <div>
                      <h2>Student Register</h2>
                      <div>register as new HELPS user</div>
                  </div>

                  <form onSubmit={this.handleSubmit.bind(this)}>
                      <div class="form-group">
                          <label>your student email</label>
                          <input type="text" class="form-control" ref={(c) =>{this.studentEmail = c}} />
                      </div>
                      <div class="form-group">
                          <label>password</label>
                          <input type="password" class="form-control" ref={(c) =>{this.studentPassword = c}} onChange={this.onPasswordChange.bind(this)} />
                          {passwordStrength}
                      </div>

                      <button class="button-red" type="submit">register</button>

                  </form>
              </div>
          </div>
        );
    }
}

export default withRouter(Register);