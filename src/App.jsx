import React from 'react';
import './App.css';

import './sass/app.scss';

import TopSection from './components/top/top'
import BottomSection from './components/bottom/bottom'

import axios from 'axios';

const KEY = '53a5089a8bc4432a819162850190205';

class App extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      city: 'New_York',
      numForcast: 4,
      isLoading: true
    };
  }

  updateWeather() {
    const {city, numForcast} = this.state;
    const URL = `http://api.apixu.com/v1/forecast.json?key=${KEY}   &q=${city}&days=${numForcast}`
    axios.get(URL).then((res) => {
      return res.data;
    }).then((data) => {
      this.setState({
        isLoading: false,
        temp_c: data.current.temp_c, 
        isDay: data.current.is_day, 
        text: data.current.condition.text, 
        iconURL: data.current.condition.icon,
        city: city.includes('_') ? city.replace('_', ' ') : city,
        forecastdays: data.forecast.forecastday
      })
    })
    .catch((err) => {
      if(err) {
        console.error('Weather API fetching has been failed, ', err);
      }
    });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on('updateWeather', (data) => {
      this.setState({ city: data }, () => { this.updateWeather() });
      console.log('Location name(city): ', data);
    });
  }

  render() {

    const { city, temp_c, isDay, text, iconURL, isLoading, forecastdays} = this.state;

    return (
      <div className='app-container'>
      <div className ='main-container'> 
      {isLoading && <h3>Loading weather...</h3>}
      {!isLoading  && (
        <div className='top-section'>
        <TopSection city={city}
         temp_c={temp_c}
          isDay={isDay}
          text={text}
          iconURL={iconURL}
          eventEmitter={this.props.eventEmitter}
          />
      </div>
      )}
      <div className='bottom-section'>
        <BottomSection forecastdays={forecastdays} />
      </div>
    </div>
  </div>
    )
  }
}

export default App;