/**
 * Created by Shin on 29/09/2016.
 */
import React from 'react';

export default class Spinner extends React.Component {



    render() {

        const {visible} = this.props;

        let style = null;
        if(visible) {
            style = {
                'display': 'block'
            }
        } else {
            style = {
                'display': 'none'
            }
        }

        return (
            <div style={style} class="spinner-wrapper">
                <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle class="path" fill="none" strokeWidth="4" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>
        );
    }
}