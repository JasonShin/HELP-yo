import React from 'react';
import { withRouter } from 'react-router';
import config from '../../config/config';
import { setStudentProfile } from '../api/student.api';
import StudentStore from '../stores/StudentStore';
import FirebaseAPI from '../api/firebase.api';
import { DateField, Calendar } from 'react-date-picker';
import { observer } from 'mobx-react';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import animationConstants from '../constants/animationConstants';

@observer
class MyProfile extends React.Component {

    //TODO: Move to const file
    //TODO: react-date-picker's default value creates permanent blue dot on the calendar, it is not user friendly.
    DOBDefault = '1991-01-01';

    currentDOBString = null;


    componentWillMount(){
        document.title = `Profiles${config.titleEnding}`;
    }

    componentDidMount(){
        FirebaseAPI.context.auth().onAuthStateChanged(firebaseUser => {

            if (firebaseUser) {
                StudentStore.fetchStudent(firebaseUser.email);
            } else {
                console.log('Not logged in');
            }
        });
    }

    onDOBChange (dateString, { dateMoment, timestamp }) {
        this.currentDOBString = dateString;
    }

    //TODO: Save additional data on firebase registeration so it can link to HELP API registeration
    handleSubmit(e) {
        e.preventDefault();

        let StudentId = this.studentIdField.value;
        let fullname = this.fullNameField.value;
        let preferredOtherName = this.otherNameField.value;
        let DateOfBirth = this.currentDOBString;
        let Degree = this.degreeField.value;
        let Status = this.statusField.value;
        let FirstLanguage = this.firstLanguageField.value;
        let CountryOrigin = this.countryOfOriginField.value;
        let Gender = this.genderField.value;
        let CreatorId = StudentId;

        setStudentProfile({StudentId, DateOfBirth, fullname, preferredOtherName, Degree, Status, FirstLanguage, CountryOrigin, Gender, CreatorId})
            .then((response) => {
                this.props.router.push('/workshopSets');
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const progressBarStyle = {
            width: '50%'
        };

        var currentStudent = StudentStore.student;
        var StudentId = currentStudent.StudentId;
        var fullname  = currentStudent.fullname;
        var preferredOtherName = currentStudent.preferredOtherName;
        var status = currentStudent.Status;
        var degree = currentStudent.Degree;
        var firstLanguage = currentStudent.FirstLanguage;
        var countryOrigin = currentStudent.CountryOrigin;

        var StudentIdField = (<input type="text" class="form-control" ref={(c) =>{this.studentIdField = c}} required="true" />);
        var fullnameField = (<input type="text" class="form-control" ref={(c) =>{this.fullNameField = c}} required="true" />);
        var preferredOtherNameField = (<input type="text" class="form-control" required="true" ref={(c) =>{this.otherNameField = c}} />);
        var statusField = (
            <select  ref={ (c) => {this.statusField = c} }>
                <option disabled selected value> -- select an option -- </option>
                <option value="local">Local</option>
                <option value="international">International</option>
            </select>
        );
        var degreeField = (
            <select ref={ (c) => {this.degreeField = c} }>
                <option disabled selected value> -- select an option -- </option>
                <option value="UG">undergraduate</option>
                <option value="PG">Postgraduate</option>
            </select>
        );
        var firstLanguageField = (
            <input type="text" class="form-control" required="true" ref={ (c) => {this.firstLanguageField = c} } />
        );
        var countryOriginField = (
            <input type="text" class="form-control" required="true" ref={ (c) => {this.countryOfOriginField = c} } />
        );

        if(StudentId !== undefined) {
            StudentIdField = (<input type="text" class="form-control" defaultValue={StudentId} ref={(c) =>{this.studentIdField = c}} required="true" />);
        }

        if(fullname !== undefined) {
            fullnameField = (<input type="text" class="form-control" defaultValue={fullname} ref={(c) =>{this.fullNameField = c}} required="true" />);
        }

        if(preferredOtherName !== undefined) {
            preferredOtherNameField = (<input type="text" defaultValue={preferredOtherName} class="form-control" required="true" ref={(c) =>{this.otherNameField = c}} />);
        }

        if(status !== undefined) {
            statusField = (
                <select  ref={ (c) => {this.statusField = c} } defaultValue={status}>
                    <option disabled selected value> -- select an option -- </option>
                    <option value="local">Local</option>
                    <option value="international">International</option>
                </select>
            );
        }

        if(degree !== undefined) {
            degreeField = (
                <select ref={ (c) => {this.degreeField = c} } defaultValue={degree}>
                    <option disabled selected value> -- select an option -- </option>
                    <option value="UG">undergraduate</option>
                    <option value="PG">Postgraduate</option>
                </select>
            );
        }

        if(firstLanguage !== undefined) {
            firstLanguageField = (<input type="text" defaultValue={firstLanguage} class="form-control" required="true" ref={ (c) => {this.firstLanguageField = c} } />);
        }

        if(countryOrigin !== undefined) {
            countryOriginField = (<input type="text" defaultValue={countryOrigin} class="form-control" required="true" ref={ (c) => {this.countryOfOriginField = c} } />);
        }


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
                <div class="container-small container-profile">
                    <div class="profile-header">
                        <h2>Tell us more about you</h2>
                        <div>setting up your profile (* denotes required data)</div>
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div class="form-group">

                            {StudentIdField}
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>your student ID*</label>

                        </div>

                        <div class="form-group">

                            {fullnameField}
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>your fullname*</label>

                        </div>
                        <div class="form-group">

                            {preferredOtherNameField}
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>preferred other name</label>

                        </div>

                        <div class="form-group-calendar">
                            <label>date of birth*</label>
                            <Calendar
                                dateFormat="YYYY-MM-DD"
                                onChange={this.onDOBChange.bind(this)}
                                ref={(c) => {this.dobField = c}}
                            />
                        </div>


                        <div class="form-group-select">

                            <label>status*</label>
                            {statusField}

                        </div>

                        <div class="form-group-select">
                            <label>degree*</label>
                            {degreeField}
                        </div>

                        <div class="form-group">

                            {firstLanguageField}
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>first language*</label>

                        </div>

                        <div class="form-group">

                            {countryOriginField}
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>country of origin*</label>

                        </div>

                        <div class="form-group-select">
                            <label>gender</label>
                            <select ref={ (c) => {this.genderField = c} }>
                                <option disabled selected value> -- select an option -- </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <span>expand to see optional fields</span>

                        <button class="button-red" type="submit">set profile</button>

                    </form>
                </div>
            </div>
        </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(MyProfile);