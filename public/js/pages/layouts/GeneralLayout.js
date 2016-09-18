import React from 'react';
import PrimaryNav from '../../components/PrimaryNav';
export default class Layout extends React.Component {
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