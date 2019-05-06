import React from 'react';

import './style.scss';

import Forcast from './forecast';

export default class BottomSection extends React.Component {

    render() {
        const { forecastdays } = this.props;
        return (
        <div className='bottom-container'>
            {forecastdays && forecastdays.map((forecastDay, id) => {
                return <Forcast forecastDay={forecastDay} key={id}/>
            })}
        </div>
        );
    }
}