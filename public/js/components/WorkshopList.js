/**
 * Created by Shin on 25/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import Spinner from '../components/Spinner';


@observer
export default class WorkshopList extends React.Component {

    componentDidMount() {
        //Initial data required to spin up the List component
        const {workshopSetId, workshopName} = this.props;
        this.props.store.fetchWorkshops(null, workshopSetId);
    }


    constructor() {
        super();
    }

    render() {
        const workshopsList = this.props.store.workshops.map( (workshop) => {
            return (
                <article class="card" key={workshop.WorkshopId}>
                    {workshop.description}
                </article>
            );
        });

        let enableSpinner = true;

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