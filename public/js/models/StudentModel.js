import {observable} from 'mobx';

export default class StudentModel {
    @observable studentID;
    @observable dob;
    @observable gender;
    @observable degree;
    @observable status;
    @observable first_language;
    @observable country_origin;
    @observable background;
    @observable HSC;
    @observable HSC_mark;
    @observable IELTS;
    @observable IELTS_mark;
    @observable TOEFL;
    @observable TOEFL_mark;
    @observable TAFE;
    @observable TAFE_mark;
    @observable CULT;
    @observable CULT_mark;
    @observable InsearchDEEP;
    @observable InsearchDEEP_mark;
    @observable InsearchDiploma;
    @observable InsearchDiploma_mark;
    @observable foundationcourse;
    @observable foundationcourse_mark;
    @observable created;
    @observable creatorID;
    @observable modified;
    @observable modifierID;
    @observable archived;
    @observable archiverID;
    @observable degree_details;
    @observable alternative_contact;
    @observable caf;
    @observable batch;
    @observable preferred_name;

    constructor(studentID, dob, gender, degree, status, first_language, country_origin, background, HSC, HSC_mark,
        IELTS, IELTS_mark, TOEFL, TOEFL_mark, TAFE, TAFE_mark, CULT, CULT_mark, InsearchDEEP, InsearchDEEP_mark,
        InsearchDiploma, InsearchDiploma_mark, foundationcourse, foundationcourse_mark, created, creatorID, modified,
        modifierID, archived, archiverID, degree_details, alternative_contact, caf, batch, preferred_name) {
    	this.studentID = studentID;
    	this.dob = dob;
    	this.gender = gender;
    	this.degree = degree;
    	this.status = status;
    	this.first_language = first_language;
    	this.country_origin = country_origin;
    	this.background = background;
    	this.HSC = HSC;
    	this.HSC_mark = HSC_mark;
    	this.IELTS = IELTS;
    	this.IELTS_mark = IELTS_mark;
    	this.TOEFL = TOEFL;
    	this.TOEFL_mark = TOEFL_mark;
    	this.TAFE = TAFE;
    	this.TAFE_mark = TAFE_mark;
    	this.CULT = CULT;
    	this.CULT_mark = CULT_mark;
    	this.InsearchDEEP = InsearchDEEP;
    	this.InsearchDEEP_mark = InsearchDEEP_mark;
    	this.InsearchDiploma = InsearchDiploma;
    	this.InsearchDiploma_mark = InsearchDiploma_mark;
    	this.foundationcourse = foundationcourse;
    	this.foundationcourse_mark = foundationcourse_mark;
    	this.created = created;
    	this.creatorID = creatorID;
    	this.modified = modified;
    	this.modifierID = modifierID;
    	this.archived = archived;
    	this.archiverID = archiverID;
    	this.degree_details = degree_details;
    	this.alternative_contact = alternative_contact;
    	this.caf = caf;
    	this.batch = batch;
    	this.preferred_name = preferred_name;
    }
}
