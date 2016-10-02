/**
 * Created by Shin on 2/10/2016.
 */
import { computed, observable, autorun } from 'mobx';
import WorkshopBookingModel from '../models/WorkshopBookingModel';
import {getWorkshopBookingFirebase} from '../api/workshop.api';

class WorkshopBookingsStore {
    @observable bookings = [];
    @observable single = null;

    listenToSingleBooking(workshopID) {
        getWorkshopBookingFirebase({workshopId: workshopID}).on('value', (snapshot) => {

            if(snapshot.val() !== null){

                var data = snapshot.val()[workshopID];

                this.single = new WorkshopBookingModel(
                    data.workshopId, data.userId
                );
            }
        });
    }

    resetSingle() {
        this.single = null;
    }

}

export default new WorkshopBookingsStore;