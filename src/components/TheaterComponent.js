'use strict';
require('styles/Theater.scss');

import React from 'react';
import classNames from 'classnames';

class TheaterComponent extends React.Component {

	constructor(props) {
    super(props);
		this.state = {
			selected: []
		}
		this.handleResetSelected = this.handleResetSelected.bind(this);
		this.handleSeatSelect = this.handleSeatSelect.bind(this);
		this.handleConfirmSeats = this.handleConfirmSeats.bind(this);
		this.getRowClass = this.getRowClass.bind(this);
		this.renderSeats = this.renderSeats.bind(this);
		this.renderHeadCols = this.renderHeadCols.bind(this);
  }

  handleResetSelected() {
  	this.setState({ selected: [] });
  }

  handleSeatSelect(row,col) {
  	var oldArr = this.state.selected;
  	if(this.props.reserved.includes(row+'-'+col)){
  		alert('Don\'t try to steal someone else\'s seat.');
  		return;
  	}
  	
  	if(this.state.selected.includes(row+'-'+col)){
  		oldArr.splice(oldArr.indexOf(row+'-'+col), 1);
  		this.setState({ selected: oldArr });
  		return;
  	}

		if(this.state.selected.length<this.props.seatLimit) {
			oldArr.push(row+'-'+col);
			this.setState({ selected: oldArr });
  	} else {
  		alert('That\'s all you can select!');
  	}
  }

  handleConfirmSeats() {
  	this.props.handleBookingConfirmation(this.state.selected);
  }

	getRowClass(row,col) {
		return classNames({
      'seat': true,
      'booked': this.props.reserved.includes(row+'-'+col),
      'selected': this.state.selected.includes(row+'-'+col)
    });
	}

	renderSeats(row) {
		return (
			<div className="seatsWrapper">
				{[...Array(this.props.columns)].map((x, i) =>
			    <span key={i} onClick={this.handleSeatSelect.bind(this, row, i+1)} className={this.getRowClass(row,i+1)}></span>
			  )}
		  </div>
		);
	}

	renderHeadCols() {
		return (
			<div className="seatsWrapper">
				{[...Array(this.props.columns)].map((x, i) =>
			    <span key={i} className="seat no-border">{i+1}</span>
			  )}
		  </div>
		);
	}

  render() {
  	var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  	var overlayClass = classNames({
      'overlay': true,
      'overlay-hide': this.props.enableTheater
    });
    return (
      <div className="theater">
      	<span className={overlayClass}></span>
        <div className="screen">Screen</div>
      	<div><span className="rowTitleWrapper"></span> {this.renderHeadCols()}</div>
      	{[...Array(this.props.rows)].map((x, i) =>
			    <div key={i}><span className="rowTitleWrapper">{alphabet[i]}</span> {this.renderSeats(i+1)}</div>
			  )}
			  <button disabled={this.state.selected.length!=this.props.seatLimit} onClick={this.handleConfirmSeats}>Confirm Booking</button>
      </div>
    );
  }
}

export default TheaterComponent;
