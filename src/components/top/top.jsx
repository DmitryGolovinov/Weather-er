import React from 'react';
import './style.scss'

import Weather from './weather';

import { Manager, Reference, Popper} from 'react-popper';

export default class TopSection extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isSelectLocationToggled: false
        };
        this.onSelectLocation = this.onSelectLocation.bind(this);
        this.toggleSelectLocation = this.toggleSelectLocation.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);

    }

    toggleSelectLocation() {
        this.setState((prevState) => ({ isSelectLocationToggled: !prevState.isSelectLocationToggled }));
    }

    onLocationChange(e) {
        this.setState({ city: e.target.value });
    }

    onSelectLocation() {
        const { city } = this.state;
        const { eventEmitter } = this.props;
        this.setState((prevState) => ({ isSelectLocationToggled: !prevState.isSelectLocationToggled }));
        eventEmitter.emit('updateWeather', city);
        
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
        const { city } = this.state;
        const { eventEmitter } = this.props;
        this.setState((prevState) => ({ isSelectLocationToggled: !prevState.isSelectLocationToggled }));
        eventEmitter.emit('updateWeather', city);
        } 
    }


    render() {
        const { isSelectLocationToggled } = this.state;

        return <div className='top-container'>
            <div className="title">Weather-er</div>
            <Weather {...this.props}/>
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <button className='btn btn-select-location' 
                        ref={ref} 
                        onClick={this.toggleSelectLocation}>
                        Select Location
                        </button>
                )}
                </Reference>
                <Popper placement="top">
                    {({ ref, style, placement, arrowProps }) => ( isSelectLocationToggled &&
            <div className='popup-container' 
                ref={ref} 
                style={style}
                data-placement={placement}>
                    <div className='popup-form'>
                        <label htmlFor="location-name">Location Name</label>
                        <input id='location-name' type="text" placeholder='Location name' onChange={this.onLocationChange} onKeyDown={this.handleKeyDown} autoFocus/>
                        <div className="buttons">
                        <button className="btn btn-select-location" onClick={this.onSelectLocation}>Select</button>
                        <button className='btn btn-cancel-location' onClick={this.toggleSelectLocation}>Cancel</button>
                        </div>
                    </div>
            <div ref={arrowProps.ref} style={arrowProps.style} />
        </div>
      )}
    </Popper>
  </Manager>
</div>
}
}

