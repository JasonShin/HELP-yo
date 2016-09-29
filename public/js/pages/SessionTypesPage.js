/**
 * Created by Shin on 18/09/2016.
 */
import React from 'react';

import SessionTypeList from '../components/SessionTypeList';
import SessionTypesStore from '../stores/SessionTypesStore';
import config from '../../config/config';
import animationConstants from '../constants/animationConstants';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import Spinner from '../components/Spinner';

export default class Home extends React.Component {
    componentWillMount(){
        document.title = `Home${config.titleEnding}`;

        this.state = {
            enableSpinner: true
        };
    }

    render() {


        return (
            <ReactCSSTransitionGroup
              transitionName="page-transition"
              transitionAppear={true}
              transitionAppearTimeout={animationConstants.animationDelay}
              transitionEnterTimeout={animationConstants.animationDelay}>
                <div id="PageContent">
                    <div class="container-types">

                        <h1>Choose a session topic</h1>
                        <SessionTypeList store={SessionTypesStore} />
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

