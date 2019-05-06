import React from 'react';

import './style.scss';

export default class Forcast extends React.Component {
    render() {
        const {forecastDay} = this.props;
        if (!forecastDay) return null;
        return (
            <div className='forcast-day'>
                <h3 className='date'>{forecastDay.date}</h3>
                <div className="image">
                <img src={forecastDay.day.condition.icon} alt="condition icon" />
                </div>
                <div className="text">{forecastDay.day.avgtemp_c}°C</div>
                <div className="info">{forecastDay.day.condition.text}</div>
            </div>
        )
    }

}