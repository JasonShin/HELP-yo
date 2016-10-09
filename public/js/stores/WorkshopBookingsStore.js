/**
 * Created by Shin on 2/10/2016.
 */
import { computed, observable, autorun } from 'mobx';
import WorkshopBookingModel from '../models/WorkshopBookingModel';
import moment from 'moment';
import {getWorkshopBookingFirebaseByWorkshopId, getWorkshopBookingFirebaseByUserId} from '../api/workshopBookings.api';

class WorkshopBookingsStore {
    @observable bookings = [];
    @observable StartDtBegin = null;
    @observable StartDtEnd = null;
    @observable single = null;

    @computed get filteredBookings() {

        return bookings.filter( (booking) => {
            var currentStartDtBegin = moment(booking.StartDtBegin);
            return currentStartDtBegin.isAfter(this.StartDtBegin);
        } );
    }

    listenToSingleBookingByWorkshopId(workshopID, userId) {
        getWorkshopBookingFirebaseByWorkshopId({workshopId: workshopID, userId: userId}).on('value', (snapshot) => {
            console.log('INFO: got value of workshop bookings by workshop ID');
            console.log(snapshot.val());
            if(snapshot.val() !== null){
                console.log('INFO: ', snapshot.val());
                var data = snapshot.val();
                this.single = new WorkshopBookingModel(
                    data.workshopId, data.userId
                );
            } else {
                this.single = '';
            }
        });
    }

    listenToBookingsByUserId(userId) {
        getWorkshopBookingFirebaseByUserId(userId).on('value', (snapshot) => {
            //Emptying bookings array
            this.bookings = [];

            if(snapshot.val() !== null) {
                var data = snapshot.val().workshopId;
                for(var key in data) {
                    let currentBooking = data[key];

                    this.bookings.push(
                        new WorkshopBookingModel(
                            currentBooking.workshopId,
                            currentBooking.userId,
                            currentBooking.topic,
                            currentBooking.description,
                            currentBooking.StartDate,
                            currentBooking.campus
                        )
                    );
                }
            }

        });
    }

    resetSingle() {
        this.single = null;
    }

}

export default new WorkshopBookingsStore;