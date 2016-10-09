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

    fetchStudent(email) {
        getStudentFirebaseProfile(email).on('value', (snapshot) => {
            var rawData = snapshot.val();
            //TODO: Put this in model later
            console.log('INFO: FOUND FROM STORE:');
            console.log(rawData);
            this.student = rawData;
        });
    }

}

export default new StudentStore;