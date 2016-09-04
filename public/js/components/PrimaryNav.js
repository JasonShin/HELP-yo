import React from 'react';
import {ReactRouter, Router, Link} from 'react-router';

export default class PrimaryNav extends React.Component {
    render() {
        return (
            <div id='PrimaryNav'>


                <ul>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/bookings/history">Nav1</Link></li>

                    <li>Nav3</li>
                    <li>Nav4</li>
                    <li>Nav6</li>
                </ul>
            </div>
        );
    }
}