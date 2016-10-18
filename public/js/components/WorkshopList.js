/**
 * Created by Shin on 25/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import {getFormattedRangeDate, getMonthDate} from '../tools/Helpers';
import WorkshopsStore from '../stores/WorkshopsStore';

@observer
export default class WorkshopList extends React.Component {

    rageDateDelimeter = ' - ';

    constructor() {
        super();
        this.state = {
            workshopSetId: 0,
            StartDtBegin: '',
            StartDtEnd: ''
        };
    }

    componentDidMount() {
        //Initial data required to spin up the List component
        const {workshopSetId, workshopName} = this.props;

        var newStates = this.getCurrentParamsObject();
        this.setState(newStates);

        this.props.store.fetchWorkshops(null, workshopSetId);
    }

    componentWillUnmount() {
        WorkshopsStore.topicFilter = '';
    }

    //TODO: Use react router built in feature to replace this procedure or put this in helper to make it reusable
    componentWillReceiveProps(nextProps) {
        var newStates = this.getCurrentParamsObject();

        // WorkshopsStore.fetchWorkshopsByStartEndDate(newStates.workshopSetId, newStates.StartDtBegin, newStates.StartDtEnd);

        this.setState(newStates);
    }

    getCurrentParamsObject() {
        var rawParams = window.location.search.replace(/^\?/, '').split('&');
        var newStates = {};
        for(var i = 0; i < rawParams.length; i++) {
            var param = rawParams[i].split('=');
            newStates[param[0]] = param[1];
        }
        console.log('INFO: raw state in workshop list');
        console.log(newStates);
        return newStates;
    }

    render() {

        const {workshopSetId, StartDtBegin, StartDtEnd} = this.state;

        console.log(workshopSetId, StartDtBegin, StartDtEnd);

        const workshopsList = this.props.store.filteredWorkshops.map( (workshop) => {

            let formattedRangeDate = getFormattedRangeDate(workshop.StartDate, workshop.EndDate, this.rageDateDelimeter);
            let maxSeats = workshop.maximum;
            let availables = workshop.maximum - workshop.BookingCount;
            let monthDate = getMonthDate(workshop.StartDate);

            return (
                <Card
                    key={workshop.WorkshopId}
                    id={workshop.WorkshopId}
                    title={workshop.topic} rangeDate={formattedRangeDate}
                    maxSeats={maxSeats} availableSeats={availables}
                    dateMeta={[monthDate.monthAsString,monthDate.date]}
                    campus={workshop.campus}
                    tutor={workshop.tutor}
                    cardType="workshop"
                />
            );
        });

        let enableSpinner = true;
        if(workshopsList.length > 0) {
            enableSpinner = false;
        }

        return (
            <div class="container-cards-list container-medium">
                <Spinner visible={enableSpinner} />
                <h1>Workshops!</h1>
                <div>
                    {workshopsList}
                </div>
            </div>
        );
    }

}