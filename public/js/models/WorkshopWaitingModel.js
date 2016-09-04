import {observable} from 'mobx';

export default class WorkshopWaitingModel {
    @observable id;
    @observable workshopID;
    @observable studentID;
    @observable priority;
    @observable created;
    @observable creatorID;
    @observable modified;
    @observable modifierID;
    @observable archived;
    @observable archiverID;


    constructor(value) {
    	this.id = id;
    	this.workshopID = workshopID;
    	this.studentID = studentID;
    	this.priority = priority;
    	this.created = created;
    	this.creatorID = creatorID;
    	this.modified = modified;
    	this.modifierID = modifierID;
    	this.archived = archived;
    	this.archiverID = archiverID;
    }
}
