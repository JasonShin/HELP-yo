import {observable} from 'mobx';

export default class LearningIssueModel {
    @observable id;
    @observable issue;
    @observable researchonly;
    @observable orderitem;
    @observable iscurrent;

    constructor(value) {
        this.id = id;
        this.issue = issue;
        this.researchonly = researchonly;
        this.orderitem = orderitem;
        this.iscurrent = iscurrent;
    }
}
