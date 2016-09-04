import {observable} from 'mobx';

export default class MessageModel {
    @observable id;
    @observable path;
    @observable filename;
    @observable modifierID;
    @observable modified;
    @observable description;
    @observable text;
    @observable cssID;
    @observable isactive;

    constructor(value) {
        this.id = id;
        this.path = path;
        this.filename = filename;
        this.modifierID = modifierID;
        this.modified = modified;
        this.description = description;
        this.text = text;
        this.cssID = cssID;
        this.isactive = isactive;
    }
}
