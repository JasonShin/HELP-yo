import React from 'react';
import { withRouter } from 'react-router';
import config from '../../config/config';
import { registerHELPNew } from '../api/student.api';

import { DateField, Calendar } from 'react-date-picker';

class MyProfile extends React.Component {

    //TODO: Move to const file
    DOBDefault = '1991-01-01';

    currentDOBString = null;


    componentWillMount(){
        document.title = `Profiles${config.titleEnding}`;

    }

    onDOBChange (dateString, { dateMoment, timestamp }) {
        this.currentDOBString = dateString;
    }

    handleSubmit(e) {
        e.preventDefault();
        registerHELPNew(...['test', 'test2','test', 'test2','test', 'test2','test', 'test2','test', 'test2']).
        then((response) => {
            console.log(response);
        }).
        catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
        <div id="PageContent">
            <div class="container-register">
                <div>
                    <h2>Tell us more about you</h2>
                    <div>setting up your profile (* denotes required data)</div>
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div class="form-group">
                        <label>your fullname*</label>
                        <input type="text" class="form-control" ref={(c) =>{this.fullName = c}} />
                    </div>
                    <div class="form-group">
                        <label>preferred other name</label>
                        <input type="text" class="form-control" ref={(c) =>{this.otherName = c}} />

                    </div>

                    <div class="form-group">
                        <label>date of birth*</label>
                        <Calendar
                            dateFormat="YYYY-MM-DD"
                            date={this.DOBDefault}
                            onChange={this.onDOBChange.bind(this)}
                            ref={(c) => {this.dob = c}}
                        />
                    </div>


                    <div class="form-group">
                        <label>status*</label>
                        <select>
                            <option disabled selected value> -- select an option -- </option>
                            <option value="local">Local</option>
                            <option value="international">International</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>degree*</label>
                        <select>
                            <option disabled selected value> -- select an option -- </option>
                            <option value="UG">undergraduate</option>
                            <option value="PG">Postgraduate</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>first language*</label>
                        <input type="text" />
                    </div>

                    <div class="form-group">
                        <label>country of origin*</label>
                        <input type="text" />
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

                    <span>expand to see optional fields</span>

                    <button class="button-red" type="submit">register</button>

                </form>
            </div>
        </div>
        );
    }
}

export default withRouter(MyProfile);