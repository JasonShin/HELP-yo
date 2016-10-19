/**
 * Created by Pranav on 30/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import StudentModel from '../models/StudentModel';
import { registerHELPNew, getStudent, getStudentFirebaseProfile } from '../api/student.api';

class StudentStore {
    @observable student = {};
    constructor() {
    }

    fetchStudent(email, cb) {
        getStudentFirebaseProfile(email).on('value', (snapshot) => {
            var rawData = snapshot.val();
            //TODO: Put this in model later
            this.student = rawData;
            if (cb) {
                cb(this.student);
            }
        });
    }

}

export default new StudentStore;