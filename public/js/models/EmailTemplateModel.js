import {observable} from 'mobx';

export default class EmailTemplateModel {
    @observable id;
    @observable subject;
    @observable body;
    @observable stagingsubject;
    @observable stagingbody;
    @observable description;
    @observable modified;
    @observable ModifierID;
    @observable published;
    @observable PublisherID;
    @observable isactived;
    @observable categoryID;

    constructor(value) {
        this.id =  id;
        this.subject =  subject;
        this.body =  body;
        this.stagingsubject =  stagingsubject;
        this.stagingbody =  stagingbody;
        this.description =  description;
        this.modified =  modified;
        this.ModifierID =  ModifierID;
        this.published =  published;
        this.PublisherID =  PublisherID;
        this.isactived =  isactived;
        this.categoryID =  categoryID;
    }
}
