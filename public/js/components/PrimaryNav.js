import React from 'react';
import {ReactRouter, Router, Link, withRouter} from 'react-router';
import FirebaseAPI from '../api/firebase.api';
import {logoutFirebase} from '../api/student.api';
import WorkshopsStore from '../stores/WorkshopsStore';
import { DateField, Calendar } from 'react-date-picker';

const classNames = require('classnames');

class PrimaryNav extends React.Component {

    pathWorkshops = '/workshops';

    constructor() {
        super();

        //Setting initial state null ensures no Login flicker
        this.state = {
            loggedIn: null,
            selectedMenu: null,
            currentFilter: '',
            workshopStartStartDate: '',
            workshopStartEndDate: '',
            showWorkshopFilterGroup: false,
            workshopFilterSelected: '',
        };
    }


    componentWillMount() {

        //Get Firebase Auth state
        FirebaseAPI.context.auth().onAuthStateChanged(firebaseUser => {

            this.setState({
                loggedIn: (null !== firebaseUser)
            });

            if (firebaseUser) {
                console.log("Logged IN", firebaseUser);
            } else {
                console.log('Not logged in');
            }
        });
    }

    handleLoginUser() {
        console.log('login pressed!');
        this.props.router.push('/login');
    }

    handleLogoutUser() {
        logoutFirebase();
        this.props.router.push('/');
    }

    /************************
    * On Filter Click STARTS
    *************************/
    onClickWorkshopTopicFilter(e) {
        e.preventDefault();
        this.setState({
            currentFilter: 'topic'
        });
    }

    onClickWorkshopDateFilter(e) {
        e.preventDefault();
        this.setState({
            currentFilter: 'date'
        });
    }

    onClickWorkshopLocationFilter(e) {
        e.preventDefault();
        this.setState({
            currentFilter: 'location'
        });
    }

    //TODO: Search by tutor does not work from API endpoint
    onClickWorkshopTutorFilter(e) {
        e.preventDefault();
        this.setState({
            currentFilter: 'tutor'
        });
    }

    /************************
     * On Filter Click ENDS
     *************************/

    onWorkshopTopicSearchChange(e) {
        e.preventDefault();
        WorkshopsStore.topicFilter = this.topicSearch.value;
    }

    //TODO: search by location does not work from API endpoint
    onWorkshopLocationSearchChange(e) {
        e.preventDefault();
        //WorkshopsStore.topicFilter = this.locationSearch.value;
    }

    onStartStartDateChange(dateString, { dateMoment, timestamp }) {
        console.log(dateString);

        this.workshopModifyQueryParams('StartDtBegin', dateString);
    }

    onStartEndDateChange(dateString, { dateMoment, timestamp }) {
        console.log(dateString);
        this.workshopModifyQueryParams('StartDtEnd', dateString);

    }

    onWorkshopSearchChange() {
        const {workshopFilterSelected, showWorkshopFilterGroup} = this.state;
        if (showWorkshopFilterGroup && workshopFilterSelected && workshopFilterSelected.trim() !== '') {
            switch (workshopFilterSelected) {
                case 'topic': {
                    WorkshopsStore.topicFilter = this.searchQuery.value;
                    break;
                }
                case 'date': {
                    // WorkshopsStore.topicFilter = this.searchQuery.value;
                    break;
                }
                case 'location': {
                    // WorkshopsStore.topicFilter = this.searchQuery.value;
                    break;
                }
                case 'tutor': {
                    // WorkshopsStore.topicFilter = this.searchQuery.value;
                    break;
                }
            }
        } else {
            if (this.searchQuery.value && this.searchQuery.value.trim() !== '') {
                this.setState({
                    showWorkshopFilterGroup: true 
                });
            } else {
                this.setState({
                    showWorkshopFilterGroup: false
                });
            }
        }
    }

    //TODO: Make this working so it can apply multiple query paramsters
    workshopModifyQueryParams(param, val) {

        var paramKeyTest = new RegExp(param, 'g');
        var currentParams = window.location.search;
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

    handleTopicSearch() {
        this.setState({
            workshopFilterSelected: 'topic'
        });
        WorkshopsStore.topicFilter = this.searchQuery.value;
    }

    handleDateSearch() {
        this.setState({
            workshopFilterSelected: 'date'
        });
        this.dateSearch = this.searchQuery.value;

    }

    handleLocationSearch() {
        this.setState({
            workshopFilterSelected: 'location'
        });
        this.locationSearch = this.searchQuery.value;
    }

    handleTutorSearch() {
        this.setState({
            workshopFilterSelected: 'tutor'
        });
        this.tutorSearch = this.searchQuery.value;
    }

    getWorkshopSearchFilters() {
        const {currentFilter, showWorkshopFilterGroup} = this.state;
        //var dateFilter, locationFilter, tutorFilter = '';
        var filter = '';
        if(currentFilter === 'topic') {
            filter = (
                <div class="search-group">
                    <input type="text" onChange={this.onWorkshopTopicSearchChange.bind(this)} ref={(c) => this.topicSearch = c} />
                </div>
            );
        } else if(currentFilter === 'date') {
            filter = (
                <div class="search-group search-group-date">
                    <div>
                        <label>Start Date</label>
                        <Calendar
                            dateFormat="YYYY-MM-DD"
                            onChange={this.onStartStartDateChange.bind(this)}
                            ref={(c) => {this.workshopStartDate = c}}
                        />
                    </div>

                    <div>
                        <label>End Date</label>
                        <Calendar
                            dateFormat="YYYY-MM-DD"
                            onChange={this.onStartEndDateChange.bind(this)}
                            ref={(c) => {this.workshopEndDate = c}}
                        />
                    </div>

                </div>
            );
        } else if(currentFilter === 'location') {
            filter = (
                <div class="search-bar">
                    <input type="text" onChange={this.onWorkshopLocationSearchChange.bind(this)} ref={(c) => this.locationSearch = c} />
                </div>
            );
        } else if(currentFilter === 'tutor') {
            filter = (
                <div class="search-bar">
                    <input type="text" onChange={this.onWorkshopLocationSearchChange.bind(this)} ref={(c) => this.locationSearch = c} />
                </div>
            );
        }
        let filterGroup;
        const topicStyle = classNames({
            filter: true,
            'filter-selected': this.state.workshopFilterSelected === 'topic',
        });

        const dateStyle = classNames({
            filter: true,
            'filter-selected': this.state.workshopFilterSelected === 'date',
        });

        const locationStyle = classNames({
            filter: true,
            'filter-selected': this.state.workshopFilterSelected === 'location',
        });

        const tutorStyle = classNames({
            filter: true,
            'filter-selected': this.state.workshopFilterSelected === 'tutor',
        });

        if (showWorkshopFilterGroup) {
            filterGroup = (
                <div class="filter-group animated slideInDown">
                    <div class="filter">Search by</div>
                    <div className={topicStyle} onClick={this.handleTopicSearch.bind(this)}>TOPIC</div>
                    <div className={dateStyle} onClick={this.handleDateSearch.bind(this)}>DATE</div>
                    <div className={locationStyle} onClick={this.handleLocationSearch.bind(this)}>LOCATION</div>
                    <div className={tutorStyle} onClick={this.handleTutorSearch.bind(this)}>TUTOR</div>
                </div>
            );
        }
        filter = (
            <div class="stretch-secondary-nav">
                <div class="search-group">
                    <div class="search-container">
                        <i class="fa fa-search offset-icon-right" aria-hidden="true"></i>
                        <input type="text" placeholder="Search all workshops" onChange={this.onWorkshopSearchChange.bind(this)} ref={(c) => this.searchQuery = c} />
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                <div class="animated slideInDown secondary-nav">
                    {filter}
                </div>
                {filterGroup}
            </div>
        );
    }

    handleWorkshopQueryChange() {
        let workshopQuery = this.workshopQuery.value;
        console.log(workshopQuery);
    }

    handleBookingsToggle() {
        if (this.state.selectedMenu === 'bookings') {
            this.state.selectedMenu = null;
        } else {
            this.state.selectedMenu = 'bookings';
        }
    }
    
    handleInfoToggle() {
        if (this.state.selectedMenu === 'info') {
            this.state.selectedMenu = null;
        } else {
            this.state.selectedMenu = 'info';
        }
    }

    handleWorkshopsToggle() {
        if (this.state.selectedMenu === 'workshops') {
            this.state.selectedMenu = null;
        } else {
            this.state.selectedMenu = 'workshops';
        }
    }

    handleFaqsToggle() {
        if (this.state.selectedMenu === 'faqs') {
            this.state.selectedMenu = null;
        } else {
            this.state.selectedMenu = 'faqs';
        }
    }


    render() {
        var authButton = '';
        if(this.state.loggedIn !== null) {
            if(this.state.loggedIn === false) {
                authButton = (<span class="auth-button-login" onClick={this.handleLoginUser.bind(this)}><i class="fa fa-sign-in" aria-hidden="true"></i>Login</span>);
            } else {
                authButton = (<span class="auth-button-logout" onClick={this.handleLogoutUser.bind(this)}>Logout</span>);
            }
        }

        //TODO: Work on from this point
        var filter = '';
        var pathname = window.location.pathname;

        //Workshops page filter
        if(pathname === this.pathWorkshops) {
            filter = this.getWorkshopSearchFilters();
        }

        const workshopsLinkStyle = classNames({
            'menu-navbar-div': true,
            'emphasise-nav-link': this.state.selectedMenu === 'workshops'
        });
        const bookingsLinkStyle = classNames({
            'menu-navbar-div': true,
            'emphasise-nav-link': this.state.selectedMenu === 'bookings'
        });
        const infoLinkStyle = classNames({
            'menu-navbar-div': true,
            'emphasise-nav-link': this.state.selectedMenu === 'info'
        });
        const faqLinkStyle = classNames({
            'menu-navbar-div': true,
            'emphasise-nav-link': this.state.selectedMenu === 'faqs'
        });

        //TODO: Find better looking overflow-y design than default one on desktop browsers
        return (
            <div class="sticky">
                <div id='PrimaryNav'>
                    <div class="logo">
                        <div class="logo-container">
                            <Link to="/">
                                <span class="logo-image"><img src="https://firebasestorage.googleapis.com/v0/b/helps-uts-project.appspot.com/o/UTS-logo.png?alt=media&token=df24fd5f-1c18-46d6-bb89-6e83cf47609f" alt="logo" /></span>
                                <span class="logo-text">UTS:HELPS</span>
                            </Link>
                        </div>
                    </div>
                    <div class="menu-container">
                        <div class="menu-navbar">
                            <div className={workshopsLinkStyle}><Link onClick={this.handleWorkshopsToggle.bind(this)} to="/workshopSets">workshops</Link></div>
                            <div className={bookingsLinkStyle}><Link onClick={this.handleBookingsToggle.bind(this)} to="/bookings/past">my bookings</Link></div>
                            <div className={infoLinkStyle}><Link onClick={this.handleInfoToggle.bind(this)} to="/profile">my info</Link></div>
                            <div className={faqLinkStyle}>faq's</div>
                            <div className="menu-navbar-div">{authButton}</div>
                        </div>
                    </div>
                </div>
                <div class="menu-filter-container">
                    <div class="menu-container">
                        <div class="menu-main-container">
                            {filter}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PrimaryNav);