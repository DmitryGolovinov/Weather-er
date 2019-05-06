import React from 'react';

export default class Weather extends React.Component {

    render() {
        const { temp_c, isDay, text, iconURL, city } = this.props;

        return (<div className="weather-container">
            <div className="header">{city}</div>
            <div className="inner-container">
                <div className="image"><img src={iconURL} alt='Weather_icon'/></div>
                <div className="weather-now">{temp_c}°C</div>
            </div>
            <div className="footer">
            <div className='isDay'>{isDay === 1 ? 'Day' : 'Night'}</div>
            <div className='condition'>{text}</div>
            </div>
        </div>
        );
    }
}