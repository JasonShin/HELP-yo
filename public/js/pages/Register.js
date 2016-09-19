import React from 'react';
import { browserHistory, Link, withRouter } from 'react-router';
import { registerFirebase, loginFirebase } from '../api/student.api';
import config from '../../config/config';
import {materialLoading} from '../material-motion/material-motion';

import { DateField, Calendar } from 'react-date-picker';


class Register extends React.Component {

    componentWillMount(){
        document.title = `Register${config.titleEnding}`;

        //InitialState
        this.state = {
            passwordStrength: ''
        };
    }

    onDOBChange (dateString, { dateMoment, timestamp }) {

        //TODO: FIND HOW TO SET PROPS -> There's no way to access Calenadr component's value directly
        this.setProps({
           dobString:  dateString
        });
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

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.dobString);
    }

    render() {

        let DOBDefault = '1991-01-01';  //Default value for calendar component
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
                          <input type="password" class="form-control" ref={(c) =>{this.password = c}} onChange={this.onPasswordChange.bind(this)} />
                          {passwordStrength}
                      </div>

                      <div class="form-group">
                          <label>your fullname</label>
                          <input type="text" class="form-control" ref={(c) =>{this.fullName = c}} />
                      </div>
                      <div class="form-group">
                          <label>preferred other name</label>
                          <input type="text" class="form-control" ref={(c) =>{this.otherName = c}} />

                      </div>

                      <div class="form-group">
                          <label>date of birth</label>
                          <Calendar
                              dateFormat="YYYY-MM-DD"
                              date={DOBDefault}
                              onChange={this.onDOBChange.bind(this)}
                              ref={(c) => {this.dob = c}}
                          />
                      </div>

                      <div class="form-group">
                          <label>gender</label>
                          <select>
                              <option disabled selected value> -- select an option -- </option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                          </select>
                      </div>

                      <button class="button-red" type="submit">register</button>

                  </form>
              </div>
          </div>
        );
    }
}

export default withRouter(Register);