import {observable} from 'mobx';

export default class WorkshopBookingModel {
    //@observable id;
    @observable workshopId;
    @observable studentID;
    @observable topic;
    @observable description;
    @observable StartDate;
    @observable EndDate;
    @observable campus;
    @observable created;
    @observable creatorID;
    @observable modified;
    @observable modifierID;
    @observable archived;
    @observable archiverID;
    @observable canceled;
    @observable attended;

    //TODO: Find an efficient way to do this http://cloudmark.github.io/Json-Mapping/
    constructor(workshopId, studentID, topic, description, StartDate, EndDate, campus, created, creatorID, modified, modifierID, archived, archiverID, canceled, attended) {
    	//this.id = id;
    	this.workshopId = workshopId;
    	this.studentID = studentID;
        this.topic = topic;
        this.description = description;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.campus = campus;
    	this.created = created;
    	this.creatorID = creatorID;
    	this.modified = modified;
    	this.modifierID = modifierID;
    	this.archived = archived;
    	this.archiverID = archiverID;
    	this.canceled = canceled;
    	this.attended = attended;
    }
}
