'use strict';
require('styles/BookingForm.scss');

import React from 'react';

class BookingFormComponent extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
			name: '',
			seats: ''
		}
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSeatsChange = this.handleSeatsChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
		this.handleResetSubmitForm = this.handleResetSubmitForm.bind(this);
  }

	handleNameChange(event) {
		this.setState({name: event.target.value});
	}

	handleSeatsChange(event) {
		this.setState({seats: event.target.value});
	}

	handleSubmitForm(event) {
		event.preventDefault();
		this.props.handleBookingForm(this.state.name, this.state.seats);
	}

	handleResetSubmitForm() {
  	this.setState({ name: '', seats: '' });
  }

  render() {
    return (
      <form className="booking-form" onSubmit={this.handleSubmitForm}>
        <div className="input-wrapper">
        	<input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required/>
        </div>
        <div className="input-wrapper">
        	<input type="number" value={this.state.seats} onChange={this.handleSeatsChange} placeholder="No. of seats" min="1" max="10" required/>
        </div>
        <div className="submit-wrapper">
        	<button type="submit">Start Selecting</button>
        </div>
      </form>
    );
  }
}
export default BookingFormComponent;
