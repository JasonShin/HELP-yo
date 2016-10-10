/**
 * Created by Shin on 10/10/2016.
 */
import React from 'react';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import animationConstants from '../constants/animationConstants';
import { DateField, Calendar } from 'react-date-picker';
import {createWorkshop} from '../api/workshop.api';

export default class CreateWorkshopPage extends React.Component {

    starting = '';
    ending = '';

    constructor() {
        super();
    }

    handleSubmit(e) {
        e.preventDefault();
        var opts = {
            id: this.idField.value,
            topic: this.topicField.value,
            description: this.descField.value,
            campusID: this.campusField.value,
            starting: this.starting,
            ending: this.ending,
            maximum: this.maximumField.value,
            cutoff: this.cutoffField.value,
            creatorID: this.creatorIdField.value,
            archiverID: this.archiverIdField.value,
            archived: this.archiverIdField.value,
            created: this.createdField.value,
            WorkShopSetID: this.workshopSetIdField.value,
            type: this.typeField.value
        };
        console.log(opts);
        createWorkshop(opts)
            .then((res) => {
                console.log('success! ' + res);
            });

    }

    onStartingChange (dateString, { dateMoment, timestamp }) {
        this.starting = dateString + 'T00:00:00';
    }

    onEndingChange (dateString, { dateMoment, timestamp }) {
        this.ending = dateString + 'T00:00:00';
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="page-transition"
                transitionAppear={true}
                transitionAppearTimeout={animationConstants.animationDelay}
                transitionEnterTimeout={animationConstants.animationDelay}>
                <div id="PageContent">
                    <div class="container-small container-profile">
                        <div class="profile-header">
                            <h2>Creating workshop</h2>
                        </div>


                        <form onSubmit={this.handleSubmit.bind(this)}>

                            <div class="form-group">
                                <input type="text" required="true" ref={ (c) => this.idField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Id</label>
                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.topicField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Topic</label>
                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.descField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Description</label>

                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.campusField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Campus ID</label>

                            </div>

                            <div class="form-group-calendar">
                                <label>Starting</label>
                                <Calendar
                                    dateFormat="YYYY-MM-DD"
                                    onChange={this.onStartingChange.bind(this)}
                                    ref={(c) => {this.startingField = c}}
                                />
                            </div>

                            <div class="form-group-calendar">
                                <label>Ending</label>
                                <Calendar
                                    dateFormat="YYYY-MM-DD"
                                    onChange={this.onEndingChange.bind(this)}
                                    ref={(c) => {this.endingField = c}}
                                />
                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.maximumField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Maximum</label>

                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.cutoffField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Cut Off</label>


                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.creatorIdField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>CreatorID</label>

                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.archiverIdField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>ArchiverID</label>

                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.createdField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Created</label>

                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.workshopSetIdField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>WorkShopSetID</label>

                            </div>

                            <div class="form-group">

                                <input type="text" required="true" ref={ (c) => this.typeField = c } />
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Type</label>

                            </div>

                            <button class="button-red" type="submit">create workshop</button>

                        </form>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}