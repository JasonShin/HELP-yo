import {observable} from 'mobx';

export default class SessionDocumentModel {
    @observable id;
    @observable sessionID;
    @observable studentID;
    @observable filename;
    @observable CreatorId;
    @observable archived;

    constructor(value) {
   		this.id = id;
   		this.sessionID = sessionID;
   		this.studentID = studentID;
   		this.filename = filename;
   		this.CreatorId = CreatorId;
   		this.archived = archived;
    }
}
