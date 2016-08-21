'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import BookingFormComponent from './BookingFormComponent';
import TheaterComponent from './TheaterComponent';
import BookingTableComponent from './BookingTableComponent';

class AppComponent extends React.Component {
	
	constructor(props) {
    super(props);
		this.state = {
			bookingForm: {},
			enableTheater: false,
			rows: 10,
			columns: 12,
			reserved: [],
			reservations: []
		}
		this.handleBookingForm = this.handleBookingForm.bind(this);
		this.handleBookingConfirmation = this.handleBookingConfirmation.bind(this);
  }

  handleBookingForm(name, seats){
  	this.setState({
			bookingForm: { name: name, seats: seats },
			enableTheater: true
  	});
  	this.refs.theaterComponent.handleResetSelected();
  }

  handleBookingConfirmation(selectedSeats){
  	var reserved = this.state.reserved.concat(selectedSeats);
  	var reservations = this.state.reservations;
  	reservations.push({
			name: this.state.bookingForm.name,
			seats: selectedSeats
		});
  	this.setState({
			bookingForm: {},
			enableTheater: false,
			reserved: reserved,
			reservations: reservations
  	});
  	this.refs.bookingFormComponent.handleResetSubmitForm();
  	this.refs.theaterComponent.handleResetSelected();
  }

  render() {
    return (
      <div className="container">
        <div className="title">Popcorn Time</div>
        <BookingFormComponent ref="bookingFormComponent" handleBookingForm={this.handleBookingForm}/>
        <TheaterComponent ref="theaterComponent" handleBookingConfirmation={this.handleBookingConfirmation} seatLimit={this.state.bookingForm.seats} enableTheater={this.state.enableTheater} reserved={this.state.reserved} rows={this.state.rows} columns={this.state.columns}/>
      	<BookingTableComponent reservations={this.state.reservations}/>
      </div>
    );
  }
}

export default AppComponent;
