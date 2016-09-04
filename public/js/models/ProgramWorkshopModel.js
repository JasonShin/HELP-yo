import {observable} from 'mobx';

export default class ProgramWorkshopModel {
    @observable programId;
    @observable workshopId;

    constructor(value) {
    	this.programId = programId;
    	this.workshopId = workshopId;
    }
}
