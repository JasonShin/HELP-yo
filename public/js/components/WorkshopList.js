/**
 * Created by Shin on 25/09/2016.
 */

import React from 'react';
import { observer } from 'mobx-react';
import {Link, withRouter} from 'react-router';


@observer
export default class WorkshopList extends React.Component {

    constructor() {
        super();
    }

    render() {

        this.props.store.fetchWorkshops();

        return (
            <div>
                workshop list!
            </div>
        );
    }

}