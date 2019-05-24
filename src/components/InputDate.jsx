import React from 'react';
import '../assets/styles/styles.css';
import CalenderJSX from './Calender';

export default class InputDateJSX extends React.Component {
	constructor() {
    super();
    this.state = {
      //showCalender: true,
      showCalender: false,
      selectDate: '',
      selectDay: new Date().getDate(),
      selectMonth: new Date().getMonth(),
      selectYear: new Date().getFullYear()
    }
  }

  setDate() {
    if(!/(31|30|2[0-9]|1[0-9]|0[1-9]|[1-9]){1}\.(12|11|10|0[1-9]|[1-9]){1}\.([1-2]{1}[0-9]{3}|[0-9]{2})/.test(this.state.selectDate)) {
      this.setState({selectDate: ''});
    } else {
      let newDate, day, month, year;
      [newDate, day, month, year] = String(this.state.selectDate).match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
      this.setState({selectDay: Number(day), selectMonth: Number(month - 1), selectYear: year});
      day = day.length === 1 ? `0${day}` : day
      month = month.length === 1 ? `0${month}` : month
      this.setState({selectDate: `${day}.${month}.${year}`});
    }
  }

  changeSelectDay = (newSelectDay) => {
    this.setState({selectDay: newSelectDay});
    const day = newSelectDay.toString().length === 1 ? `0${newSelectDay}` : newSelectDay
    const month = (this.state.selectMonth + 1).toString().length === 1 ? `0${this.state.selectMonth + 1}` : this.state.selectMonth + 1
    this.setState({selectDate: `${day}.${month}.${this.state.selectYear}`});

  }

  changeSelectMonth = (newSelectMonth) => {
    this.setState({selectMonth: newSelectMonth});
    const day = this.state.selectDay.toString().length === 1 ? `0${this.state.selectDay}` : this.state.selectDay
    const month = (newSelectMonth + 1).toString().length === 1 ? `0${newSelectMonth + 1}` : newSelectMonth + 1
    this.setState({selectDate: `${day}.${month}.${this.state.selectYear}`});

  }

  changeSelectYear = (newSelectYear) => {
    this.setState({selectYear: newSelectYear});
    const day = this.state.selectDay.toString().length === 1 ? `0${this.state.selectDay}` : this.state.selectDay
    const month = (this.state.selectMonth + 1).toString().length === 1 ? `0${this.state.selectMonth + 1}` : this.state.selectMonth + 1
    this.setState({selectDate: `${day}.${month}.${newSelectYear}`});

  }

	render() {
		return (
			<div className="inputDate">
        <div className="field">
          <input
            type="text"
            className="value"
            value={this.state.selectDate}
            onChange={event => {this.setState({selectDate: event.currentTarget.value})} }
            onFocus={() => {this.setState({showCalender: false})}}
            onBlur={() => {
              this.setDate()
            }}
          />
          <div
            className="imgCalender"
            onClick={() => {
              this.setState({showCalender: !this.state.showCalender});
            }}
          ></div>
        </div>
        <div hidden={this.state.showCalender}>
          <CalenderJSX
            onChangeSelectDay={this.changeSelectDay}
            selectDay={this.state.selectDay}
            onChangeSelectMonth={this.changeSelectMonth}
            selectMonth={this.state.selectMonth}
            onChangeSelectYear={this.changeSelectYear}
            selectYear={this.state.selectYear}
          />
        </div>
			</div>
		);
	}
}
