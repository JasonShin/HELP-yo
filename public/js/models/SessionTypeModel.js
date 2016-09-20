import {observable} from 'mobx';

export default class SessionTypeModel {
    @observable id;
    @observable iscurrent;
    @observable abbName;
    @observable fullName;

    constructor(id, iscurrent, abbName, fullName) {
    	this.id = id;
    	this.iscurrent = iscurrent;
        this.abbName = abbName;
    	this.fullName = fullName;
    }
}
