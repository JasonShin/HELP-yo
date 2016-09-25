import React from 'react';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class BookingsHistory extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <ReactCSSTransitionGroup 
              transitionName="page-transition"
              transitionAppear={true}
              transitionAppearTimeout={800}
              transitionEnterTimeout={800}>
                <div>
                    <h1>My bookings</h1>

                </div>
            </ReactCSSTransitionGroup>
        );
    }
}