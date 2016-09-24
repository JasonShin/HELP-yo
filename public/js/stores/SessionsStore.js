import { computed, observable, autorun } from 'mobx';
import SessionModel from '../models/SessionModel';


class SessionsStore {
    @observable sessions = [];

    constructor() {

    }



}

export default new SessionsStore;