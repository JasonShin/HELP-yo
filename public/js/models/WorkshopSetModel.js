import {observable} from 'mobx';

export default class WorkshopSetModel {
    @observable id;
    @observable name;
    @observable archived;

    constructor(id, name, archived) {
    	this.id = id;
    	this.name = name;
    	this.archived = archived;
    }
}
