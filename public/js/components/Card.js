/**
 * Created by Shin on 1/10/2016.
 */
import React from 'react';
import {ReactRouter, Router, Link, withRouter} from 'react-router';

//TODO: Used this on WorkshopList and SessionsList components
export default class Card extends React.Component {

    cardTypes = {
        workshop: 'workshop',
        session: 'session'
    };

    constructor() {
        super();
    }

    getBuildingNumber(building) {
        return building.split('\.')[0];
    }

    render() {
        let {id = '', cardType = '',
            type = '', title = '', rangeDate = '', lecturerEmail = '',
            maxSeats = '', availableSeats = '', dateMeta = '', campus = '', tutor = ''} = this.props;
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

        if(tutor !== '') {
            tutor = (<div><i class="fa fa-graduation-cap" aria-hidden="true"></i> {tutor}</div>);
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

        let moreDetailsLink = '';
        if(cardType === this.cardTypes.workshop) {

            moreDetailsLink = (
                <Link key={id} to={"workshop?workshopId=" + id}>more details</Link>
            );
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
                        {tutor}
                        <div class="card-more-details">{moreDetailsLink}</div>
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