/**
 * Created by Shin on 1/10/2016.
 */
import React from 'react';
import { observer } from 'mobx-react';
import WorkshopModel from '../models/WorkshopModel';
import SessionModel from '../models/SessionModel';
import {getFormattedRangeDate, getMonthDate} from '../tools/Helpers';

@observer
export default class Single extends React.Component {

    rangeDateDelimeter = ' - ';

    constructor() {
        super();
    }

    render() {

        const singleInstance = this.props.store.single;
        let singleComponent = '';

        if(singleInstance instanceof WorkshopModel) {

            let formattedDate = getFormattedRangeDate(singleInstance.StartDate, singleInstance.EndDate, this.rangeDateDelimeter);
            let availables = singleInstance.maximum - singleInstance.BookingCount;

            singleComponent = (

                <div class="single">

                    <div class="single-meta-top">
                        <div class="single-meta-top-left">
                            <div>

                                banner

                            </div>
                        </div>

                        <div class="single-meta-top-right">
                            <div>

                                <header>{singleInstance.topic}</header>
                                <div class="single-ranged-date">{formattedDate}</div>
                                <div class="single-target-group">
                                    <h3>target group</h3>
                                    <div>{singleInstance.targetingGroup}</div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="single-controls">
                        <div>
                            <div class="single-controls-right">
                                <div>
                                    <button class="button-book">book now</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="single-meta-bottom">

                        <div class="single-meta-bottom-left">
                            <div>

                                <div>
                                    <h3>description</h3>
                                    <div>{singleInstance.description}</div>
                                </div>

                            </div>
                        </div>


                        <div class="single-meta-bottom-right">
                            <div>

                                <div>
                                    <h3>room</h3>
                                    <div>{singleInstance.campus}</div>
                                </div>
                                <div>
                                    <h3>spots available</h3>
                                    <div>{availables}</div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            );
        }

        return (
            <div class="container-medium">
                {singleComponent}
            </div>
        );
    }

}