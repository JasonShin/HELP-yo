import React from 'react';
import { browserHistory, Link, withRouter } from 'react-router';
import { registerFirebase, loginFirebase } from '../api/student.api';
import config from '../../config/config';

import { DateField, Calendar } from 'react-date-picker';

const SECURITY_SCORE_REQUIREMENT = 100; //User must pass this security mark to register

class Register extends React.Component {

    currentSecurityScore = 0;


    componentWillMount(){
        document.title = `Register${config.titleEnding}`;

        //InitialState
        this.state = {
            passwordStrength: '',
            passwordStrengthScore: 0
        };
    }



    //TODO: Optimise this to make it more realistic
    //TODO: Create the password field in a separate component
    onPasswordChange() {
        let passwordVal = this.studentPassword.value;
        let passwordLength = passwordVal.length;
        let passwordLabelColour = '';
        let passwordStrengthMessage = '';
        let passwordStrengthScore = 0;
        let passwordStrengthLabel = '';

        let rules = [
            {
                rule: /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*\d{3,}/,
                suggestion: '',
                score: 30
            },

            {
                rule: /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{12,}/,
                suggestion: '',
                score: 30
            },

            {
                rule: /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}/,
                suggestion: '',
                score: 20
            },

            {
                rule: /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{4,}/,
                suggestion: '',
                score: 20
            }
        ];

        rules.forEach((data) => {
            if(data.rule.test(passwordVal)) {
                passwordStrengthScore += data.score;
            }
        });

        if(passwordStrengthScore === 0) {

            this.setState({
                passwordStrength: ''
            });

        } else {

            if (passwordStrengthScore <= 20) {
                passwordLabelColour = 'red';
                passwordStrengthMessage = `It would take ${passwordLength * 10} min to hack your password`;
            } else if (passwordStrengthScore <= 40) {
                passwordLabelColour = 'rgba(173, 162, 0, 1)';
                passwordStrengthMessage = `It would take ${passwordLength * 10} hour to hack your password`;
            } else if (passwordStrengthScore <= 70) {
                passwordLabelColour = 'black';
                passwordStrengthMessage = `It would take ${passwordLength * 10} month to hack your password`;
            } else if (passwordStrengthScore >= 100) {
                passwordLabelColour = 'green';
                passwordStrengthMessage = `It would take ${passwordLength * 10} year to hack your password`;
            }
            let passwordLabelStyle = {
                color: passwordLabelColour
            };
            this.setState({
                passwordStrengthScore: passwordStrengthScore,
                passwordStrengthLabel: (<span style={passwordLabelStyle}>{passwordStrengthMessage}</span>)
            });

        }

    }

    //() => on succes, sends to register profile page
    handleSubmit(e) {
        e.preventDefault();

        const {passwordStrengthScore} = this.state;

        if(passwordStrengthScore > SECURITY_SCORE_REQUIREMENT) {
            registerFirebase(
                {
                    email: this.studentEmail.value,
                    password: this.studentPassword.value
                }
            ).then((response) => {
                this.props.router.push('/profile');
                console.log('yoyo! success ' + response);
            }).catch((error) => {
                console.log('failed! ' + error);
            });
        } else {

        }
    }


    render() {

        const {passwordStrengthLabel, passwordStrengthScore} = this.state;

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
                          {passwordStrengthLabel}
                      </div>

                      <button class="button-red" type="submit">register</button>

                  </form>
              </div>
          </div>
        );
    }
}

export default withRouter(Register);