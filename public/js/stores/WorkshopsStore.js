/**
 * Created by Shin on 24/09/2016.
 */
import { computed, observable, autorun } from 'mobx';
import WorkshopModel from '../models/WorkshopModel';
import { searchWorkshops } from '../api/workshop.api';

const data = require('./data');
const moment = require('moment');

class WorkshopsStore {
    @observable workshops = [];
    @observable topicFilter = '';
    @observable dateFilter = '';
    @observable locationFilter = '';
    @observable tutorFilter = '';
    @observable single = null;

    //TODO: Complete this when Workshop API is working
    //NOTE: Inital fetching
    fetchWorkshops(studentId, workshopSetId) {
        searchWorkshops({
            pageSize: 150,
            workshopSetId: workshopSetId
        }).then((response) => {

            console.log('Workshop data fetched');

            const apiWorkshops = response.data.Results.map((data) => {
                return this.mapDataToModel(data);
            });

            this.workshops = apiWorkshops.concat(data.workshops.filter((workshop) => {
                return workshop.WorkShopSetID === workshopSetId;
            }).map((w) => {
                return this.mapDataToModel(w);
            }));

            console.log(this.workshops.length);

        }).catch((error) => {
            console.log(error);
        });
    }

    //TODO: Search by StartStartDate and StartEndDate
    //TODO: startingDtBegin=2013-04-10T10:00&startingDtEnd=2013-04-17T10:00
    fetchWorkshopsByStartEndDate(workshopSetId, StartDtBegin, StartDtEnd) {

        console.log('INFO: Fetching by date: ' , workshopSetId, StartDtBegin, StartDtEnd);
        var newStartDtBegin = StartDtBegin+'T00:00:00';
        var newStartDtEnd = StartDtEnd+'T00:00:00';

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
        });
    }



    @computed get filteredWorkshops() {
        if (this.topicFilter !== '') {
            var topicMatcher = new RegExp(this.topicFilter, 'i');
            return this.workshops.filter((workshop) => {
                return topicMatcher.test(workshop.topic);
            });
        } else if (this.dateFilter !== '') {
            return this.workshops.filter((workshop) => {
                return moment(this.dateFilter).isBetween(workshop.StartDate, workshop.EndDate, null, '[]');
            });
        } else if (this.tutorFilter !== '') {
            var tutorMatcher = new RegExp(this.tutorFilter, 'i');
            return this.workshops;
        } else if (this.locationFilter !== '') {
            var locationMatcher = new RegExp(this.locationFilter, 'i');
            return this.workshops.filter((workshop) => {
                return locationMatcher.test(workshop.campus);
            });
        } else {
            return this.workshops;
        }

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


        let pageVal = this.getPageNum(workshopId);

        searchWorkshops({
            page: pageVal
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