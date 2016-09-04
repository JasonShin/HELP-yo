import {observable} from 'mobx';

export default class LecturerModel {
    @observable id;
    @observable staffID;
    @observable first_name;
    @observable last_name;
    @observable email;
    @observable created;
    @observable creatorId;
    @observable modified;
    @observable modifierId;
    @observable archived;
    @observable archiverID;
    @observable inactive;

    constructor(value) {
        this.id = id;
        this.staffID = staffID;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.created = created;
        this.creatorId = creatorId;
        this.modified = modified;
        this.modifierId = modifierId;
        this.archived = archived;
        this.archiverID = archiverID;
        this.inactive = inactive;
    }
}
