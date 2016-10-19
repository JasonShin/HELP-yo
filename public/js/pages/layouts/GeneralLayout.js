import React from 'react';
import PrimaryNav from '../../components/PrimaryNav';
import {ReactRouter, Router, Link, withRouter} from 'react-router';

class Layout extends React.Component {

    onHelpClick(e) {
        e.preventDefault();
        this.props.router.push('/createWorkshop');
    }

    render () {
        return (

            <div>
                <PrimaryNav />
                <div id="Page">
                    {this.props.children}
                </div>
            </div>

        );
    }
}

export default withRouter(Layout);