import React from 'react';
import '../assets/styles/styles.css';
import DaysInMonthJSX from './DaysInMonth';

export default class CalenderJSX extends React.Component {
	constructor() {
    super();
    this.state = {
      //showCalender: true
      showCalender: false
    }
	}

	render() {
		return (
			<div className="calender">
        <div>Calender</div>
        <div className="month">Month</div>
        <div className="year">Year</div>
        <div className="days">Days</div>
        <div className="today">
          <DaysInMonthJSX />
        </div>
			</div>
		);
	}
}
