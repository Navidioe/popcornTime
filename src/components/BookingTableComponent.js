'use strict';
require('styles/BookingTable.scss');

import React from 'react';
import classNames from 'classnames';

class BookingTableComponent extends React.Component {
  
  getSeat(seat, i) {
  	var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  	var seatArr = seat.split('-');
  	if(i==0) {
  		return (
	  		<span key={i}>{alphabet[seatArr[0]-1]+seatArr[1]}</span>
	  	)
  	} else {
  		return (
	  		<span key={i}>, {alphabet[seatArr[0]-1]+seatArr[1]}</span>
	  	)
  	}
  }

  render() {
  	var tblClass = classNames({
	    'bookingtable': true,
	    'bookingtable-hide': this.props.reservations.length==0
	  });
    return (
      <table className={tblClass}>
        <thead>
        	<tr>
        		<th>Name</th>
     				<th>Seat Count</th>
     				<th>Seat Details</th>
        	</tr>
        </thead>
        <tbody>
        	{this.props.reservations.map((reservation, i) =>
				    <tr key={i}>
	        		<td>{reservation.name}</td>
	     				<td>{reservation.seats.length}</td>
	     				<td>{reservation.seats.map((seat, i) => this.getSeat(seat, i))}</td>
	        	</tr>
				  )}
        </tbody>
      </table>
    );
  }
}

export default BookingTableComponent;
