import {observable} from 'mobx';

export default class ProgramModel {
    @observable id;
    @observable name;
    @observable days;
    @observable numOfWeeks;
    @observable startDate;
    @observable endDate;
    @observable maximum;
    @observable cutoff;
    @observable created;
    @observable creatorId;
    @observable modified;
    @observable modifierId;
    @observable archived;
    @observable archiverId;
    @observable reminder_num;
    @observable reminder_sent;

    constructor(value) {
    	this.id = id;
    	this.name = name;
    	this.days = days;
    	this.numOfWeeks = numOfWeeks;
    	this.startDate = startDate;
    	this.endDate = endDate;
    	this.maximum = maximum;
    	this.cutoff = cutoff;
    	this.created = created;
    	this.creatorId = creatorId;
    	this.modified = modified;
    	this.modifierId = modifierId;
    	this.archived = archived;
    	this.archiverId = archiverId;
    	this.reminder_num = reminder_num;
    	this.reminder_sent = reminder_sent;

    }
}
