/**
 * Created by Shin on 25/09/2016.
 */
import React from 'react';
import WorkshopsStore from '../stores/WorkshopsStore';
import WorkshopList from '../components/WorkshopList';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Workshops extends React.Component {

    render() {

        return (
            <ReactCSSTransitionGroup 
              transitionName="page-transition"
              transitionAppear={true}
              transitionAppearTimeout={800}
              transitionEnterTimeout={800}>
                <div id="PageContent">
                    <div class="container-cards-list">
                        <h1>Workshops!</h1>
                        <WorkshopList store={WorkshopsStore} />
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}