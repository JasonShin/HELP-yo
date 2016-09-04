import {observable} from 'mobx';

export default class BookingModel {
    @observable id;
    @observable studentID;
    @observable sessionId;
    @observable cancel;
    @observable assisstance;
    @observable reason;
    @observable attended;
    @observable waitingID;
    @observable created;
    @observable creatorId;
    @observable modified;
    @observable modifierId;
    @observable archived;
    @observable archiverID;
    @observable isgroup;
    @observable numpeople;
    @observable lecturercomment;
    @observable learningissues;
    @observable islocked;
    @observable assigntype;
    @observable assigntypeOther;
    @observable subject;
    @observable appointments;
    @observable appointmentsOther;
    @observable assisstanceText;

    constructor(value) {
    	this.id = id;
    	this.studentID = studentID;
    	this.sessionId = sessionId;
    	this.cancel = cancel;
    	this.assisstance = assisstance;
    	this.reason = reason;
    	this.attended = attended;
    	this.waitingID = waitingID;
    	this.created = created;
    	this.creatorId = creatorId;
    	this.modified = modified;
    	this.modifierId = modifierId;
    	this.archived = archived;
    	this.archiverID = archiverID;
    	this.isgroup = isgroup;
    	this.numpeople = numpeople;
    	this.lecturercomment = lecturercomment;
    	this.learningissues = learningissues;
    	this.islocked = islocked;
    	this.assigntype = assigntype;
    	this.assigntypeOther = assigntypeOther;
    	this.subject = subject;
    	this.appointments = appointments;
    	this.appointmentsOther = appointmentsOther;
    	this.assisstanceText = assisstanceText;
    }
}
