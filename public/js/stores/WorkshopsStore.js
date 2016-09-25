/**
 * Created by Shin on 24/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import WorkshopModel from '../models/WorkshopModel';
import { searchWorkshops } from '../api/workshop.api';

class WorkshopsStore {
    @observable workshops = [];



    fetchWorkshops(studentId, workshopSetId) {
        searchWorkshops({
            workshopSetId: 3
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }
}

export default new WorkshopsStore;