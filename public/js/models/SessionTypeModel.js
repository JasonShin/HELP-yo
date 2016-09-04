import {observable} from 'mobx';

export default class SessionTypeModel {
    @observable id;
    @observable complete;
    @observable iscurrent;
    @observable fullName;

    constructor(value) {
    	this.id = id;
    	this.complete = complete;
    	this.iscurrent = iscurrent;
    	this.fullName = fullName;
    }
}
