import {observable} from 'mobx';

export default class WaitingModel {
    @observable id;
    @observable studentID;
    @observable sessionId;
    @observable assisstance;
    @observable reason;
    @observable priority;
    @observable created;
    @observable creatorId;
    @observable modified;
    @observable modifierId;
    @observable archived;
    @observable archiverID;
    @observable isgroup;
    @observable numpeople;
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
    	this.assisstance = assisstance;
    	this.reason = reason;
    	this.priority = priority;
    	this.created = created;
    	this.creatorId = creatorId;
    	this.modified = modified;
    	this.modifierId = modifierId;
    	this.archived = archived;
    	this.archiverID = archiverID;
    	this.isgroup = isgroup;
    	this.numpeople = numpeople;
    	this.assigntype = assigntype;
    	this.assigntypeOther = assigntypeOther;
    	this.subject = subject;
    	this.appointments = appointments;
    	this.appointmentsOther = appointmentsOther;
    	this.assisstanceText = assisstanceText;
    }
}
