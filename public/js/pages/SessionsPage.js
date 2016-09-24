import React from 'react';

export default class Sessions extends React.Component {



    render() {
        
        const {sessionTypeId} = this.props.location.query;

        return (
            <div>
                <h1>Sessions</h1>

            </div>
        );
    }
}