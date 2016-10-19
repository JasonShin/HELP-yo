/**
 * Created by Shin on 24/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import WorkshopModel from '../models/WorkshopModel';
import { searchWorkshops, searchWorkshopsFirebase, searchWorkshopByIdFirebase } from '../api/workshop.api';

//const data = require('./data');
const moment = require('moment');

class WorkshopsStore {
    @observable workshops = [];
    @observable topicFilter = '';
    @observable dateFilter = '';
    @observable locationFilter = '';
    @observable tutorFilter = '';
    @observable single = null;

    //NOTE: Inital fetching
    fetchWorkshops(studentId, workshopSetId) {

        this.workshops.length = 0;

        searchWorkshopsFirebase({
            workshopSetId
        }).then((response) => {
            console.log('WORKSHOPS LOADED',response);
            for(var workshopKey of Object.keys(response)) {
                this.workshops.push(this.mapDataToModel(response[workshopKey]));
            }

        });
    }

    //TODO: Search by StartStartDate and StartEndDate
    //TODO: startingDtBegin=2013-04-10T10:00&startingDtEnd=2013-04-17T10:00
    fetchWorkshopsByStartEndDate(workshopSetId, StartDtBegin, StartDtEnd) {

        console.log('INFO: Fetching by date: ' , workshopSetId, StartDtBegin, StartDtEnd);
        var newStartDtBegin = StartDtBegin+'T00:00:00';
        var newStartDtEnd = StartDtEnd+'T00:00:00';
        /*
        searchWorkshops({
            pageSize: 150,
            workshopSetId: workshopSetId,
            startingDtBegin: newStartDtBegin,
            startingDtEnd: newStartDtEnd
        }).then((response) => {

            console.log('Workshop data fetched');
            console.log(response.data.Results);

            this.workshops = response.data.Results.map((data) => {
                return this.mapDataToModel(data);
            });
        }).catch((error) => {
            console.log(error);
        });*/
        if(StartDtBegin !== undefined && StartDtBegin !== '' && StartDtEnd !== undefined && StartDtEnd !== '') {
            const filteredByDate =  this.workshops.filter((workshop) => {
                var workshopDate = moment(workshop.StartDate);
                var targetStartDate = moment(StartDtBegin);
                var targetEndDate = moment(StartDtEnd);

                if(workshopDate.isBefore(targetEndDate) && workshopDate.isAfter(targetStartDate)) {
                    return true;
                } else {
                    return false;
                }
            });
            this.workshops = filteredByDate;
        }
        console.log('filtering by date: ', newStartDtBegin);
    }



    @computed get filteredWorkshops() {
        if (this.topicFilter !== '') {
            var topicMatcher = new RegExp(this.topicFilter, 'i');
            return this.workshops.filter((workshop) => {
                return topicMatcher.test(workshop.topic);
            });
        } else if (this.dateFilter !== '') {
            var dateMatcherWithoutProcessed = new RegExp(this.dateFilter, 'i');
            const filteredByDate =  this.workshops.filter((workshop) => {
                return (dateMatcherWithoutProcessed.test(workshop.EndDate) || dateMatcherWithoutProcessed.test(workshop.StartDate));
            });
            if (!filteredByDate.length || filteredByDate.length === 0) {
                let processed = new Date(this.dateFilter);
                processed.setDate(processed.getDate() + 1);
                if (processed.toString() !== 'Invalid Date') {
                    processed = processed.toISOString().slice(0, 10);
                    var dateMatcher = new RegExp(processed, 'i');
                    return this.workshops.filter((workshop) => {
                        return (dateMatcher.test(workshop.EndDate) || dateMatcher.test(workshop.StartDate));
                    });
                }
            }
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

        // console.log('INFO: Topic filter changed ', this.topicFilter, this.topicFilter == '' );

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

    //Ability to fetch from local data if local data exist
    findWorkshopById(workshopId) {

        searchWorkshopByIdFirebase({workshopId}).
        then((workshop) => {
            console.log('INFO: Found workshop by ID!');
            console.log(workshop);
            this.single = this.mapDataToModel(workshop);
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