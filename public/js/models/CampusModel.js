import {observable} from 'mobx';

export default class CampusModel {
    @observable id;
    @observable campus;
    @observable creatorID;
    @observable created;
    @observable modifierID;
    @observable modified;
    @observable archiverID;
    @observable archived;

    constructor(value) {
    	this.id = id;
    	this.campus = campus;
    	this.creatorID = creatorID;
    	this.created = created;
    	this.modifierID = modifierID;
    	this.modified = modified;
    	this.archiverID = archiverID;
    	this.archived = archived;
    }
}
