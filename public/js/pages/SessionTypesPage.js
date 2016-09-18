/**
 * Created by Shin on 18/09/2016.
 */
import React from 'react';
import SessionTypeList from '../components/SessionTypeList';
import config from '../../config/config';

export default class Home extends React.Component {
    componentWillMount(){
        document.title = `Home${config.titleEnding}`;
    }

    render() {
        return (
            <div id="PageContent">
                <h1>Homepage !! sessions types page</h1>
                <SessionTypeList />
            </div>
        );
    }
}

