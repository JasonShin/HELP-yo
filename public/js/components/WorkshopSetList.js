/**
 * Created by Shin on 24/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';


@observer
export default class WorkshopSetList extends React.Component {

    constructor() {
        super();
    }

    render() {

        const workshopSetList = this.props.store.workshopSets.map((workshopSet) => {
            return (
                <Link key={workshopSet.id}
                      class="session-type"
                      to={"/workshops?workshopSetId=" + (workshopSet.id)}
                      params={{workshopSetId: workshopSet.id, name: workshopSet.name}}>

                    {workshopSet.name}
                </Link>
            );
        });

        return (
            <div class="session-types-list">
                {workshopSetList}
            </div>
        );

    }
}