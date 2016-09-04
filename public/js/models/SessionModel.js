import {observable} from 'mobx';

export default class SessionModel {
    @observable id;
    @observable starting;
    @observable ending;
    @observable campus;
    @observable lecturer;
    @observable type;
    @observable created;
    @observable creatorId;
    @observable modified;
    @observable modifierId;
    @observable archived;
    @observable archiverID;

    constructor(value) {
    	this.id = id;
    	this.starting = starting;
    	this.ending = ending;
    	this.campus = campus;
    	this.lecturer = lecturer;
    	this.type = type;
    	this.created = created;
    	this.creatorId = creatorId;
    	this.modified = modified;
    	this.modifierId = modifierId;
    	this.archived = archived;
    	this.archiverID = archiverID;
    }
}
