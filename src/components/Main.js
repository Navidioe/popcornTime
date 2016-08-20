'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import BookingFormComponent from './BookingFormComponent';

class AppComponent extends React.Component {
	
	constructor(props) {
    super(props);
		this.state = {
			theaterData: {
				bookingForm: {},
				rows: 10,
				columns: 12,
				reserved: [],
				selected: []
			}
		}
		this.handleBookingForm = this.handleBookingForm.bind(this);
  }

  handleBookingForm(name, seats){
  	this.setState({
  		theaterData: { bookingForm: { name: name, seats: seats }}
  	})
  }

  render() {
    return (
      <div className="container">
        <div className="title">Popcorn Time</div>
        <BookingFormComponent handleBookingForm={this.handleBookingForm}/>
      </div>
    );
  }
}

export default AppComponent;
