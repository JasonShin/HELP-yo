/**
 * Created by Shin on 24/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import WorkshopSetModel from '../models/WorkshopSetModel';
import { listWorkshopSets } from '../api/workshop.api';

class WorkshopSetsStore {
    @observable workshopSets = [];

    constructor() {
        listWorkshopSets(true).
            then((response) => {

                this.workshopSets = response.data.Results.map((data) => {
                    return new WorkshopSetModel(data.id, data.name, data.archived);
                });
            }).
            catch((error) => {
                console.log(error);
            });
    }
}

export default new WorkshopSetsStore;