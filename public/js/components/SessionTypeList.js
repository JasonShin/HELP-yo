/**
 * Created by Shin on 18/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';
import Spinner from '../components/Spinner';

@observer
export default class SessionTypeList extends React.Component {

    constructor() {
        super();
        this.state = {
            sessionTypes: ""
        }
    }



    render() {

        const sessionTypesList = this.props.store.sessionTypes.map((sessionType) => {
            return (
                <Link key={sessionType.id}
                      class="session-type"
                      to={"/sessions?sessionTypeId=" + (sessionType.id)}
                      params={{sessionTypeId: sessionType.id, type: sessionType.abbName}}>

                    {sessionType.fullName}
                </Link>
            );
        });

        let enableSpinner = true;

        if(sessionTypesList.length > 0) {
            enableSpinner = false;
        }

        return (
            <div class="container-types container-small">
                <Spinner visible={enableSpinner} />
                <h1>Choose a session topic</h1>
                <div class="session-types-list">
                    {sessionTypesList}
                </div>
            </div>
        );

    }
}