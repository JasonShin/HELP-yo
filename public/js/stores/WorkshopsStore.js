/**
 * Created by Shin on 24/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import WorkshopModel from '../models/WorkshopModel';
import { searchWorkshops } from '../api/workshop.api';

class WorkshopsStore {
    @observable workshops = [];
    @observable single = null;

    //TODO: Complete this when Workshop API is working
    fetchWorkshops(studentId, workshopSetId) {
        searchWorkshops({

            workshopSetId: workshopSetId
        }).then((response) => {

            console.log('Workshop data fetched');
            console.log(response.data.Results);

            this.workshops = response.data.Results.map((data) => {
                return this.mapDataToModel(data);
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    //Ability to fetch from local data if local data exist
    findWorkshopById(workshopId) {
        searchWorkshops({
            workshopId: workshopId
        }).then((response) => {
            this.single = this.mapDataToModel(
                response.data.Results.find((workshop) => {
                    return workshop.WorkshopId == workshopId;
                })
            );

        }).catch((error) => {
            console.log(error);
        });
    }

    mapDataToModel(data) {
        return new WorkshopModel(
            data.BookingCount,
            data.DaysOfWeek,
            data.EndDate,
            data.NumOfWeeks,
            data.ProgramEndDate,
            data.ProgramId,
            data.ProgramStartDate,
            data.StartDate,
            data.WorkShopSetID,
            data.WorkshopId,
            data.archived,
            data.campus,
            data.cutoff,
            data.description,
            data.maximum,
            data.reminder_num,
            data.reminder_sent,
            data.targetingGroup,
            data.topic,
            data.type
        );
    }


}

export default new WorkshopsStore;