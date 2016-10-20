/**
 * Created by Shin on 24/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import WorkshopSetModel from '../models/WorkshopSetModel';
import { listWorkshopSets} from '../api/workshopSets.api';

class WorkshopSetsStore {
    @observable workshopSets = [];

    constructor() {

        listWorkshopSets().
        then((response) => {
            console.log('INFO: Correctly fetched workshop sets from firebase');
            this.workshopSets = response.map((data) => {
                return new WorkshopSetModel(data.id, data.name, data.archived);
            });
        }).
        catch(() => {
            //TODO: Implement catch
        });
    }
}

export default new WorkshopSetsStore();