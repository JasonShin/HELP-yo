/**
 * Created by Pranav on 30/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import StudentModel from '../models/StudentModel';
import { registerHELPNew, getStudent } from '../api/student.api';

class StudentStore {
    @observable student = {};
    constructor() {
    }

    returnStudent() {
        return this.student;
    }

    fetchStudent(studentId) {
        getStudent({studentId})
        .then((response) => {
                const { Student: student } = response.data;
                this.student = new StudentModel(
                    student.studentID.trim(),
                    student.dob.trim(),
                    student.gender.trim(),
                    student.degree.trim(),
                    student.status.trim(),
                    student.first_language.trim(),
                    student.country_origin.trim(),
                    student.background,
                    student.HSC,
                    student.HSC_mark,
                    student.IELTS,
                    student.IELTS_mark,
                    student.TOEFL,
                    student.TOEFL_mark,
                    student.TAFE,
                    student.TAFE_mark,
                    student.CULT,
                    student.CULT_mark,
                    student.InsearchDEEP,
                    student.InsearchDEEP_mark,
                    student.InsearchDiploma,
                    student.InsearchDiploma_mark,
                    student.foundationcourse,
                    student.foundationcourse_mark,
                    student.created,
                    student.creatorID,
                    student.modified,
                    student.modifierID,
                    student.archived,
                    student.archiverID,
                    student.degree_details.trim(),
                    student.alternative_contact,
                    student.caf,
                    student.batch,
                    student.preferred_name,
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    registerHELPstudent(StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId,
    Gender, Background, DegreeDetails, AltContact, Preferred, HSC, HSCMark, IELTS, IELTSMark, TAFE, TAFEMark,
    CULT, CULTMark, InsearchDEEP, InsearchDEEPMark, InsearchDiploma, InsearchDiplomaMark,
    FoundationCourse, FoundationCourseMark) {
        registerHELPNew(StudentId, DateOfBirth, Degree, Status, FirstLanguage, CountryOrigin, CreatorId,
            Gender, Background, DegreeDetails, AltContact, Preferred, HSC, HSCMark, IELTS, IELTSMark, TAFE, TAFEMark,
            CULT, CULTMark, InsearchDEEP, InsearchDEEPMark, InsearchDiploma, InsearchDiplomaMark,
            FoundationCourse, FoundationCourseMark)
        .then((response) => {
            this.fetchStudent(StudentId);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export default new StudentStore;