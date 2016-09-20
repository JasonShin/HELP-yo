/**
 * Created by Shin on 18/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class SessionTypeList extends React.Component {

    constructor() {
        super();
        this.state = {
            sessionTypes: ""
        }
    }

    componentDidMount() {

    }

    render() {
        
        const sessionTypesList = this.props.store.sessionTypes.map((sessionType) => {
            return (
                <li key={sessionType.id}>
                    {sessionType.fullName}
                </li>
            );
        });

        return (
          <div>
              {sessionTypesList}
          </div>
        );

    }
}