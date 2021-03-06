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
    @observable showFuture = false;
    @observable single = null;

    @computed get filteredBookings() {
        var currentDate = moment();
        if(this.showFuture === false) {
            return this.bookings.filter( (booking) =>{
                var bookingEndDate = moment(booking.EndDate);
                return bookingEndDate.isBefore(currentDate);
            } );
        } else {
            return this.bookings.filter( (booking) =>{
                var bookingEndDate = moment(booking.EndDate);
                return bookingEndDate.isAfter(currentDate);
            } );
        }

    }



    listenToSingleBookingByWorkshopId(workshopID, userId) {
        getWorkshopBookingFirebaseByWorkshopId({workshopId: workshopID, userId: userId}).on('value', (snapshot) => {
            console.log('INFO: got value of workshop bookings by workshop ID');
            console.log(snapshot.val());
            if(snapshot.val() !== null){
                console.log('INFO: ', snapshot.val());
                var data = snapshot.val();

                //TODO: Instead of creating model, just use JSON object
                /*this.single = new WorkshopBookingModel(
                    data.workshopId, data.userId
                );*/
                this.single = data;
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
                    console.log('INFO: workshop booking pushing list');
                    console.log(currentBooking);
                    this.bookings.push(
                        new WorkshopBookingModel(
                            currentBooking.workshopId,
                            currentBooking.userId,
                            currentBooking.topic,
                            currentBooking.description,
                            currentBooking.StartDate,
                            currentBooking.EndDate,
                            currentBooking.campus,
                            currentBooking.created,
                            currentBooking.creatorID,
                            currentBooking.modified,
                            currentBooking.modifierID,
                            currentBooking.archived,
                            currentBooking.archiverID,
                            currentBooking.canceled,
                            currentBooking.attended,
                            currentBooking.tutor,
                            currentBooking.maximum,
                            currentBooking.BookingCount
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