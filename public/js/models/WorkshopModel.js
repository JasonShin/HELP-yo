import {observable} from 'mobx';

export default class WorkshopModel {
    @observable id;
    @observable topic;
    @observable description;
    @observable targetingGroup;
    @observable campusID;
    @observable starting;
    @observable ending;
    @observable maximum;
    @observable cutoff;
    @observable creatorID;
    @observable created;
    @observable modifierID;
    @observable modified;
    @observable archiverID;
    @observable archived;
    @observable WorkShopSetID;
    @observable type;
    @observable reminder_num;
    @observable reminder_sent;

    constructor(value) {
    	this.id = id;
    	this.topic = topic;
    	this.description = description;
    	this.targetingGroup = targetingGroup;
    	this.campusID = campusID;
    	this.starting = starting;
    	this.ending = ending;
    	this.maximum = maximum;
    	this.cutoff = cutoff;
    	this.creatorID = creatorID;
    	this.created = created;
    	this.modifierID = modifierID;
    	this.modified = modified;
    	this.archiverID = archiverID;
    	this.archived = archived;
    	this.WorkShopSetID = WorkShopSetID;
    	this.type = type;
    	this.reminder_num = reminder_num;
    	this.reminder_sent = reminder_sent;
    }
}
