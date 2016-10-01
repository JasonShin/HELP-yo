/**
 * Created by Shin on 1/10/2016.
 */
import React from 'react';

//TODO: Used this on WorkshopList and SessionsList components
export default class Card extends React.Component {

    constructor() {
        super();
    }

    getBuildingNumber(building) {
        return building.split('\.')[0];
    }

    render() {

        let {id = '',
            type = '', title = '', rangeDate = '', lecturerEmail = '',
            maxSeats = '', availableSeats = '', dateMeta = '', campus = ''} = this.props;

        //Workshop & Session
        if(title !== '') {
            title = (<header>{title}</header>);
        }

        //Workshop
        if(rangeDate !== '') {
            rangeDate = (<div>{rangeDate}</div>);
        }

        //Workshop
        if(maxSeats !== '') {
            maxSeats = (<div>{maxSeats} sessions</div>);
        }

        //Workshop
        if(availableSeats !== '') {
            availableSeats = (<div>{availableSeats} available spots tick</div>)
        }

        //Session
        if(lecturerEmail !== '') {
            lecturerEmail = (<div><i class="fa fa-graduation-cap" aria-hidden="true"></i> {lecturerEmail}</div>);
        }

        //TODO: Stronger validation required
        if(dateMeta !== '') {
            dateMeta = (
                <div class="date-meta">
                    <span>{dateMeta[0]}</span>
                    <span>{dateMeta[1]}</span>
                </div>
            )
        }

        if(campus !== '') {
            campus = (
                <div class="building-number-meta">
                    <i class="fa fa-building" aria-hidden="true"></i>
                    <span>{this.getBuildingNumber(campus)}</span>
                </div>
            )
        }

        return (
            <article class="card" key={id}>
                <div class="card-inner">
                    <div class="card-meta-left">
                        {title}
                        {rangeDate}
                        {maxSeats}
                        {availableSeats}
                        {lecturerEmail}
                        <div class="card-more-details">more details</div>
                    </div>

                    <div class="card-meta-right">
                        {dateMeta}
                        {campus}
                    </div>
                </div>
            </article>
        );
    }
}