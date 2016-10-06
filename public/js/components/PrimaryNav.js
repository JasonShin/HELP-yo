import React from 'react';
import {ReactRouter, Router, Link, withRouter} from 'react-router';
import FirebaseAPI from '../api/firebase.api';
import {logoutFirebase} from '../api/student.api';
import WorkshopsStore from '../stores/WorkshopsStore';

class PrimaryNav extends React.Component {

    pathWorkshops = '/workshops';

    constructor() {
        super();

        //Setting initial state null ensures no Login flicker
        this.state = {
            loggedIn: null,
            selectedMenu: null,
            currentFilter: ''
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
    
    handleWorkshopsToggle() {
        if (this.state.selectedMenu) {
            this.state.selectedMenu = null;
        } else {
            this.state.selectedMenu = 'workshops';
        }
    }

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

    onClickWorkshopTutorFilter(e) {
        e.preventDefault();
        this.setState({
            currentFilter: 'tutor'
        });
    }

    onWorkshopTopicSearchChange(e) {
        e.preventDefault();
        WorkshopsStore.topicFilter = this.topicSearch.value;
    }

    onWorkshopLocationSearchChange(e) {
        e.preventDefault();
        //WorkshopsStore.topicFilter = this.locationSearch.value;
    }

    //TODO: Make this working so it can apply multiple query paramsters
    workshopModifyQueryParams(newParams) {
        //New query params


        //Existing query params
        var objParams = {};

        var params = window.location.search;
        var paramExist = window.location.search.indexOf(newParams.key);
        if(paramExist > -1) {
            var test = params.replace(/newParams\.key=[\w\d]*]/g,newParams.key+'='+newParams.val);
        }

    }

    getWorkshopSearchFilters() {
        const {currentFilter} = this.state;
        //var dateFilter, locationFilter, tutorFilter = '';
        var filter = '';

        if(currentFilter === 'topic') {
            filter = (
                <div class="search-group">
                    <input type="text" onChange={this.onWorkshopTopicSearchChange.bind(this)} ref={(c) => this.topicSearch = c} />
                </div>
            );
        } else if(currentFilter === 'date') {
            filter = (<div>Date Filter showing!</div>);
        } else if(currentFilter === 'location') {
            filter = (
                <div class="search-bar">
                    <input type="text" onChange={this.onWorkshopLocationSearchChange.bind(this)} ref={(c) => this.locationSearch = c} />
                </div>
            );
        } else if(currentFilter === 'tutor') {
            filter = (<div>Tutor filter!</div>);
        }

        return (
            <div>
                <ul class="filters-control">
                    <li>
                        <span onClick={this.onClickWorkshopTopicFilter.bind(this)}>topic</span>
                    </li>

                    <li>
                        <span class="filter-control-date" onClick={this.onClickWorkshopDateFilter.bind(this)}>date</span>
                    </li>

                    <li>
                        <span onClick={this.onClickWorkshopLocationFilter.bind(this)}>location</span>
                    </li>

                    <li>
                        <span onClick={this.onClickWorkshopTutorFilter.bind(this)}>tutor</span>
                    </li>
                </ul>
                {filter}
            </div>
        );
    }

    handleWorkshopQueryChange() {
        let workshopQuery = this.workshopQuery.value;
        console.log(workshopQuery);
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

        //TODO: Find better looking overflow-y design than default one on desktop browsers
        return (
            <div>
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
                        <div class="menu-main-container">
                            <ul>
                                <li class="motion-ripple-button"><Link onClick={this.handleWorkshopsToggle.bind(this)} to="/workshopSets">workshops</Link></li>
                                <li><Link to="/bookings/history">my bookings</Link></li>
                                <li><Link to="/profile">my info</Link></li>
                                <li>faq's</li>
                                <li>{authButton}</li>
                            </ul>
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