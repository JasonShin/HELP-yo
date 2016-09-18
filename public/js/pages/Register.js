import React from 'react';
import { browserHistory, Link, withRouter } from 'react-router'
import { registerFirebase, loginFirebase } from '../api/student.api';
import config from '../../config/config';
import {materialLoading} from '../material-motion/material-motion';

import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';


class Register extends React.Component {

    componentWillMount(){
        document.title = `Register${config.titleEnding}`;

    }

    onChange (dateString, { dateMoment, timestamp }) {
        console.log(dateString)
    }

    render() {
        let date = '2017-04-24';
        return (
          <div id="PageContent">
              <div class="container-register">

                  <div>
                      <h2>Student Register</h2>
                      <div>register as new HELPS user</div>
                  </div>

                  <form>
                      <div class="form-group">
                          <label>your student email</label>
                          <input type="text" ref={(c) =>{this.fullName = c}} value="" />
                      </div>
                      <div class="form-group">
                          <label>password</label>
                          <input type="password" ref={(c) =>{this.otherName = c}} value="" />
                      </div>

                      <div class="form-group">
                          <label>your fullname</label>
                          <input type="text" ref={(c) =>{this.fullName = c}} value="" />
                      </div>
                      <div class="form-group">
                          <label>preferred other name</label>
                          <input type="text" ref={(c) =>{this.otherName = c}} value="" />
                          <Calendar
                              dateFormat="YYYY-MM-DD"
                              date={date}
                              onChange={this.onChange.bind(this)}
                          />
                      </div>



                  </form>
              </div>
          </div>
        );
    }
}

export default withRouter(Register);