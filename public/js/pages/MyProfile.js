import React from 'react';
import { withRouter } from 'react-router';
import config from '../../config/config';
import { registerHELPNew } from '../api/student.api';

import StudentStore from '../stores/StudentStore';
import { DateField, Calendar } from 'react-date-picker';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import animationConstants from '../constants/animationConstants';

class MyProfile extends React.Component {

    //TODO: Move to const file
    //TODO: react-date-picker's default value creates permanent blue dot on the calendar, it is not user friendly.
    DOBDefault = '1991-01-01';

    currentDOBString = null;


    componentWillMount(){
        document.title = `Profiles${config.titleEnding}`;
    }

    componentDidMount(){
        const studentHELP = StudentStore.returnStudent();
        console.log(studentHELP);
        if(studentHELP.studentId) {
            StudentStore.fetchStudent(studentHELP.studentId)
            .then((student) => {
                this.studentIdField.value = student.studentId;
                this.currentDOBString = student.dob;
                this.degreeField.value = student.degree;
                this.statusField.value = student.status.toLowerCase();
                this.firstLanguageField.value = student.first_language;
                this.countryOfOriginField.value = student.country_origin;
            })
            .catch((error) => {
                console.log(`MyProfile Error: ${error}`);
            });
        }
    }

    onDOBChange (dateString, { dateMoment, timestamp }) {
        this.currentDOBString = dateString;
    }

    //TODO: Save additional data on firebase registeration so it can link to HELP API registeration
    handleSubmit(e) {
        e.preventDefault();

        let StudentId = this.studentIdField.value;
        let DateOfBirth = this.currentDOBString;
        let Degree = this.degreeField.value;
        let Status = this.statusField.value;
        let FirstLanguage = this.firstLanguageField.value;
        let CountryOrigin = this.countryOfOriginField.value;
        let CreatorId = StudentId;

        StudentStore.registerHELPstudent(StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        const progressBarStyle = {
            width: '50%'
        };
        return (
        <ReactCSSTransitionGroup 
          transitionName="page-transition"
          transitionAppear={true}
          transitionAppearTimeout={animationConstants.animationDelay}
          transitionEnterTimeout={animationConstants.animationDelay}>
            <div id="PageContent">
                <div class="progress">
                  <div class="determinate" style={progressBarStyle}></div>
                </div>
                <div class="container-small">
                    <div>
                        <h2>Tell us more about you</h2>
                        <div>setting up your profile (* denotes required data)</div>
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div class="form-group">
                            <label>your student ID*</label>
                            <input type="text" value={this.studentIdField} class="form-control" ref={(c) =>{this.studentIdField = c}} />
                        </div>

                        <div class="form-group">
                            <label>your fullname*</label>
                            <input type="text" value={this.fullNameField} class="form-control" ref={(c) =>{this.fullNameField = c}} />
                        </div>
                        <div class="form-group">
                            <label>preferred other name</label>
                            <input type="text" value={this.otherNameField} class="form-control" ref={(c) =>{this.otherNameField = c}} />

                        </div>

                        <div class="form-group">
                            <label>date of birth*</label>
                            <Calendar
                                dateFormat="YYYY-MM-DD"
                                date={this.dobField || this.DOBDefault}
                                onChange={this.onDOBChange.bind(this)}
                                ref={(c) => {this.dobField = c}}
                            />
                        </div>


                        <div class="form-group">
                            <label>status*</label>
                            <select value={this.statusField} ref={ (c) => {this.statusField = c} }>
                                <option disabled selected value> -- select an option -- </option>
                                <option value="local">Local</option>
                                <option value="international">International</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>degree*</label>
                            <select value={this.degreeField} ref={ (c) => {this.degreeField = c} }>
                                <option disabled selected value> -- select an option -- </option>
                                <option value="UG">undergraduate</option>
                                <option value="PG">Postgraduate</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>first language*</label>
                            <input type="text" value={this.firstLanguageField} ref={ (c) => {this.firstLanguageField = c} } />
                        </div>

                        <div class="form-group">
                            <label>country of origin*</label>
                            <input type="text" value={this.countryOfOriginField} ref={ (c) => {this.countryOfOriginField = c} } />
                        </div>

                        <div class="form-group">
                            <label>gender</label>
                            <select value={this.genderField} ref={ (c) => {this.genderField = c} }>
                                <option disabled selected value> -- select an option -- </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <span>expand to see optional fields</span>

                        <button class="button-red" type="submit">register</button>

                    </form>
                </div>
            </div>
        </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(MyProfile);