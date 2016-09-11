import React from 'react';
import {ReactRouter, Router, Link} from 'react-router';

export default class PrimaryNav extends React.Component {
    render() {
        return (
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
                            <li><Link to="/login">workshops</Link></li>
                            <li><Link to="/bookings/history">my bookings</Link></li>
                            <li>my info</li>
                            <li>faq's</li>
                        </ul>
                    </div>
                    <div class="menu-sub-container">

                    </div>
                </div>
            </div>
        );
    }
}