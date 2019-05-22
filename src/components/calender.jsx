import React from 'react';
import '../assets/styles/styles.css';
import DaysInMonthJSX from './DaysInMonth';
import PropsType from 'prop-types';

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
          <DaysInMonthJSX onChangeSelectDay={this.props.onChangeSelectDay} selectDay={this.props.selectDay} />
        </div>
			</div>
		);
	}
}

CalenderJSX.propsType = {
	onChangeSelectDay: PropsType.func.isRequired,
	selectDay: PropsType.number.isRequired,
}
