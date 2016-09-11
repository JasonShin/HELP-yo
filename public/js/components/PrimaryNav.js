import React from 'react';
import {ReactRouter, Router, Link} from 'react-router';

export default class PrimaryNav extends React.Component {
    render() {
        return (
            <div id='PrimaryNav'>

                <div class="logo">
                    <div class="logo-container">
                        <span class="logo-image"><img src="https://firebasestorage.googleapis.com/v0/b/helps-uts-project.appspot.com/o/UTS-logo.png?alt=media&token=df24fd5f-1c18-46d6-bb89-6e83cf47609f" alt="logo" /></span>
                        <span class="logo-text">UTS:HELPS</span>
                    </div>
                </div>
                <div class="menu-container">
                    <div class="menu-main-container">
                        <ul>
                            <i class="fa fa-bars" aria-hidden="true"></i>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/bookings/history">Nav1</Link></li>

                            <li>Nav3</li>
                            <li>Nav4</li>
                            <li>Nav6</li>
                        </ul>
                    </div>
                    <div class="menu-sub-container">

                    </div>
                </div>
            </div>
        );
    }
}