/**
 * Created by Shin on 18/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import SessionTypeModel from '../models/SessionTypeModel';
import {getAllSessionsTypes} from '../api/sessionsTypes.api';

class SessionTypesStore {
    @observable sessionTypes = [];

    constructor() {
        getAllSessionsTypes().
        then((response) =>{
            this.sessionTypes = response.data.Results.map((data) => {
                return new SessionTypeModel(data.id, data.iscurrent, data.abbName, data.fullName);
            });
        });
    }



}

export default new SessionTypesStore;