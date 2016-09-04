import {observable} from 'mobx';

export default class WorkshopSetModel {
    @observable id;
    @observable name;
    @observable created;
    @observable creatorID;
    @observable archived;
    @observable archiverID;
    @observable modified;
    @observable modifierID;
    @observable isActived;

    constructor(value) {
    	this.id = id;
    	this.name = name;
    	this.created = created;
    	this.creatorID = creatorID;
    	this.archived = archived;
    	this.archiverID = archiverID;
    	this.modified = modified;
    	this.modifierID = modifierID;
    	this.isActived = isActived;
    }
}
