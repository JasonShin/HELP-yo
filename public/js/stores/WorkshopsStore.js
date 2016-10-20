/**
 * Created by Shin on 24/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import WorkshopModel from '../models/WorkshopModel';
import { searchWorkshops, searchWorkshopsFirebase, searchWorkshopByIdFirebase, getWaitlistByWorkshop } from '../api/workshop.api';

//const data = require('./data');
const moment = require('moment');

class WorkshopsStore {
    @observable workshops = [];
    @observable topicFilter = '';
    @observable dateFilter = '';
    @observable StartDtBegin = '';
    @observable StartDtEnd = '';
    @observable locationFilter = '';
    @observable tutorFilter = '';
    @observable single = null;
    @observable singleWaitlist = null;

    //NOTE: Inital fetching
    fetchWorkshops(studentId, workshopSetId) {

        this.workshops.length = 0;

        return new Promise((resolve, reject) => {
            searchWorkshopsFirebase({
                workshopSetId
            }).then((response) => {
                for(var workshopKey of Object.keys(response)) {
                    this.workshops.push(this.mapDataToModel(response[workshopKey]));
                }
                resolve();
            }).catch(() => {
                reject();
            });
        });

    }

    @computed get filteredWorkshops() {

        if (this.topicFilter !== '') {
            var topicMatcher = new RegExp(this.topicFilter, 'i');
            return this.workshops.filter((workshop) => {
                return topicMatcher.test(workshop.topic);
            });
        } else if(this.StartDtBegin !== undefined && this.StartDtBegin !== '' && this.StartDtEnd !== undefined && this.StartDtEnd !== '') {
            console.log('Start ' , this.StartDtBegin, ' end: ' , this.StartDtEnd);
            var newStartDtBegin = this.StartDtBegin+'T00:00:00';
            var newStartDtEnd = this.StartDtEnd+'T00:00:00';

            const filteredByDate =  this.workshops.filter((workshop) => {
                var workshopDate = moment(workshop.StartDate);
                var targetStartDate = moment(newStartDtBegin);
                var targetEndDate = moment(newStartDtEnd);

                if(workshopDate.isBefore(targetEndDate) && workshopDate.isAfter(targetStartDate)) {
                    return true;
                } else {
                    return false;
                }
            });
            return filteredByDate;
        } else if (this.tutorFilter !== '') {
            var tutorMatcher = new RegExp(this.tutorFilter, 'i');
            return this.workshops.filter((workshop) => {
                return workshop.tutor && tutorMatcher.test(workshop.tutor);
            });
        } else if (this.locationFilter !== '') {
            var locationMatcher = new RegExp(this.locationFilter, 'i');
            return this.workshops.filter((workshop) => {
                return locationMatcher.test(workshop.campus);
            });
        }
        return this.workshops;
    }

    getPageNum(workshopId) {
        //TODO: Fix API code
        //API does not know how to use workshopId to search.
        //Use page and pageSize trick to search.
        //Plussing 1 because page starts from 1
        //Default number of items queries is 10
        let pageVal = Math.floor(workshopId / 10) + 1;
        //If its % 10 = 0, then assign normal value to pageVal
        if(workshopId % 10 === 0) {
            pageVal = workshopId / 10;
        }

        return pageVal
    }

    refreshWaitlist(workshopId) {
        getWaitlistByWorkshop({workshopId}).then((waitlist) => {
            // console.log('waitlist', waitlist);
            this.singleWaitlist = waitlist;
        });
    }

    //Ability to fetch from local data if local data exist
    findWorkshopById(workshopId) {
        searchWorkshopByIdFirebase({workshopId}).
        then((workshop) => {
            this.single = this.mapDataToModel(workshop);
            console.log('INFO: Found workshop by ID!');
            console.log(workshop);
        });

        getWaitlistByWorkshop({workshopId}).then((waitlist) => {
            // console.log('waitlist', waitlist);
            this.singleWaitlist = waitlist;
        });

        /*
        let pageVal = this.getPageNum(workshopId);

        searchWorkshops({
            page: pageVal
        }).then((response) => {
            if (response.data.Results.length === 0) {
                this.single = this.mapDataToModel(data.workshops.find((w) => w.WorkshopId == workshopId));
            } else {
                this.single = this.mapDataToModel(
                    response.data.Results.find((workshop) => {

                        return workshop.WorkshopId == workshopId;
                    })
                );                
            }
        }).catch((error) => {
            console.log(error);
        });*/
    }

    //TODO: Fake date here
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
            data.workshopSetID,
            data.id,
            data.archived,
            data.campus,
            data.cutoff,
            data.description,
            data.maximum,
            data.reminder_num,
            data.reminder_sent,
            data.targetingGroup,
            data.topic,
            data.type,
            data.tutor,
        );
    }


}

export default new WorkshopsStore;