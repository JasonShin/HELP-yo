import {observable} from 'mobx';

export default class EmailTemplateCategoryModel {
    @observable id;
    @observable category;

    constructor(value) {
        this.id = id;
        this.category = category;
    }
}
