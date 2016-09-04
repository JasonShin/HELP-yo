import {observable} from 'mobx';

export default class AssignmentModel {
    @observable id;
    @observable type;
    @observable orderItem;
    @observable iscurrent;

    constructor(value) {
    	this.id = id;
    	this.type = type;
    	this.orderItem = orderItem;
    	this.iscurrent = iscurrent;
    }
}
