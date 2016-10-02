/**
 * Created by Shin on 25/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import {getFormattedRangeDate, getMonthDate} from '../tools/Helpers';

@observer
export default class WorkshopList extends React.Component {

    rageDateDelimeter = ' - ';

    constructor() {
        super();

    }

    componentDidMount() {
        //Initial data required to spin up the List component
        const {workshopSetId, workshopName} = this.props;

        this.props.store.fetchWorkshops(null, workshopSetId);
    }



    render() {
        const workshopsList = this.props.store.workshops.map( (workshop) => {

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