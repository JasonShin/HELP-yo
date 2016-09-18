/**
 * Created by Shin on 18/09/2016.
 */
import { computed, observable } from 'mobx';
import SessionTypeModel from '../models/SessionTypeModel';

class SessionTypesStore {
    @observable sessionTypes = [];


}

export default new SessionTypesStore;