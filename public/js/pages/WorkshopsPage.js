/**
 * Created by Shin on 25/09/2016.
 */
import React from 'react';
import config from '../../config/config';
import WorkshopsStore from '../stores/WorkshopsStore';
import WorkshopList from '../components/WorkshopList';
import animationConstants from '../constants/animationConstants';
import {ReactRouter, Router, Link, withRouter} from 'react-router';
import { DateField, Calendar } from 'react-date-picker';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Workshops extends React.Component {

    componentWillMount() {
        document.title = `Workshops${config.titleEnding}`;

        this.state = {
            currentFilterInput: ''
        }
    }

    onDateClearClick(e) {
        e.preventDefault();
        this.workshopModifyQueryParams('StartDtBegin', '');
        this.workshopModifyQueryParams('StartDtEnd', '');
    }

    onTopicInputChange(e) {
        e.preventDefault();
        console.log(this.topicField.value);
        this.workshopModifyQueryParams('topic', this.topicField.value);
    }

    onFromDateChange(dateString, { dateMoment, timestamp }) {
        this.workshopModifyQueryParams('StartDtBegin', dateString);
    }

    onToDateChange(dateString, { dateMoment, timestamp }) {
        this.workshopModifyQueryParams('StartDtEnd', dateString);
    }

    onLocationChange(e) {
        e.preventDefault();
        this.workshopModifyQueryParams('location', this.locationField.value);
    }

    onTutorChange(e) {
        e.preventDefault();
        this.workshopModifyQueryParams('tutor', this.tutorField.value);
    }

    handleTopicSearch(e) {
        e.preventDefault();

        this.setState({
            currentFilterInput: (
                <div class="filter-inputs-container">
                    <div class="form-group">
                        <input type="text" placeholder="search by topic" ref={c => this.topicField = c} onChange={this.onTopicInputChange.bind(this)} />
                    </div>
                </div>
            )
        });
    }

    handleDateSearch(e) {
        e.preventDefault();
        this.setState({
            currentFilterInput: (
                <div>
                    <div class="filter-inputs-container filter-calendars-container">
                        <div>
                            <h4>from date</h4>
                            <Calendar
                                dateFormat="YYYY-MM-DD"
                                onChange={this.onFromDateChange.bind(this)}
                                ref={(c) => {this.fromDateField = c}}
                            />
                        </div>
                        <div>
                            <h4>date to</h4>
                            <Calendar
                                dateFormat="YYYY-MM-DD"
                                onChange={this.onToDateChange.bind(this)}
                                ref={(c) => {this.toDateField = c}}
                            />
                        </div>
                    </div>
                    <div class="filter-calendars-clear">
                        <button onClick={this.onDateClearClick.bind(this)}>Clear date filter</button>
                    </div>
                </div>
            )
        });
    }

    handleLocationSearch(e) {
        e.preventDefault();
        this.setState({
            currentFilterInput: (
                <div class="filter-inputs-container">
                    <div class="form-group">
                        <input type="text" placeholder="search by location" ref={c => this.locationField = c} onChange={this.onLocationChange.bind(this)} />
                    </div>
                </div>
            )
        });
    }

    handleTutorSearch(e) {
        e.preventDefault();
        this.setState({
            currentFilterInput: (
                <div class="filter-inputs-container">
                    <div class="form-group">
                        <input type="text" placeholder="search by tutor" ref={c => this.tutorField = c} onChange={this.onTutorChange.bind(this)} />
                    </div>
                </div>
            )
        });
    }

    //TODO: Make this working so it can apply multiple query paramsters
    workshopModifyQueryParams(param, val) {

        var paramKeyTest = new RegExp(param, 'g');
        var currentParams = window.location.search;

        console.log('INFO: modifying params: ' , currentParams);

        if(paramKeyTest.test(currentParams)){
            //Param exist so replacing it with new value
            var targetParamPattern = new RegExp(param+'\\=[\\d\\w\\s\\/\?\\-\\*]*', 'g');
            var edittedParam = currentParams.replace(targetParamPattern, param + '=' + val);
            this.props.router.push('/workshops'+edittedParam);
        } else {
            //TODO: Refactor this
            currentParams += ('&' + param + '=' + val);
            this.props.router.push('/workshops'+currentParams);
        }
    }

    render() {
        const {workshopSetId} = this.props.location.query;
        const {currentFilterInput} = this.state;

        return (
            <ReactCSSTransitionGroup
              transitionName="page-transition"
              transitionAppear={true}
              transitionAppearTimeout={animationConstants.animationDelay}
              transitionEnterTimeout={animationConstants.animationDelay}>

                <div class="menu-filter-container">
                    <div class="filter-group">
                        <div class="filter-title">Search by</div>
                        <div class="filter-options">
                            <div onClick={this.handleTopicSearch.bind(this)}>TOPIC</div>
                            <div onClick={this.handleDateSearch.bind(this)}>DATE</div>
                            <div onClick={this.handleLocationSearch.bind(this)}>LOCATION</div>
                            <div onClick={this.handleTutorSearch.bind(this)}>TUTOR</div>
                        </div>
                        <div class="filter-inputs">
                            {currentFilterInput}
                        </div>
                    </div>
                </div>

                <div id="PageContent">
                    <WorkshopList store={WorkshopsStore} workshopSetId={workshopSetId} />
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

export default withRouter(Workshops);