/**
 * Created by Shin on 18/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {getAllSessionsTypes} from '../api/sessionsTypes.api';

@observer
export default class SessionTypeList extends React.Component {

    constructor() {
        super();
        this.state = {
            sessionTypes: ""
        }
    }

    componentWillMount() {

        getAllSessionsTypes()
            .then((response) => {
                this.setState({
                    sessionTypes: response.data.Results
                });
            });


    }

    render() {

        const {sessionTypes} = this.state;

        console.log(sessionTypes);

        return (
          <div>
             hey
          </div>
        );

    }
}