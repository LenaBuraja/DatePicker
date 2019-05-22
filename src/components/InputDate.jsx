import React from 'react';
import '../assets/styles/styles.css';
import CalenderJSX from './Calender';

export default class InputDateJSX extends React.Component {
	constructor() {
    super();
    this.state = {
      //showCalender: true
      showCalender: false,
      selectDate: new Date(),
      selectDay: new Date().getDate(),
      selectMonth: new Date().getMonth(),
      selectYear: new Date().getFullYear()
    }
  }
  
  onChangeDate(newDate) {
    let day, month, year;
    [newDate, day, month, year] = String(newDate).match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    this.setState({selectDate: new Date(year, month, day)});
    console.log(this.state.selectDate)
  }

  changeSelectDay = (newSelectDay) => {
    this.setState({selectDay: newSelectDay});
  }

  changeSelectMonth = (newSelectMonth) => {
    this.setState({selectMonth: newSelectMonth});
  }

  formatDate() {
    let day = this.state.selectDate.getDate().toString();
    day = day.length === 1 ? `0${day}` : day
    let month = (this.state.selectDate.getMonth() + 1).toString();
    month = month.length === 1 ? `0${month}` : month
    return `${day}.${month}.${this.state.selectDate.getFullYear()}`
  }

	render() {
		return (
			<div className="inputDate">
        <div className="field">
          <input
            type="text"
            className="value"
            pattern="(31|30|2[0-9]|1[0-9]|0[1-9]|[1-9]){1}\.(12|11|10|0[1-9]|[1-9]){1}\.([1-2]{1}[0-9]{3}|[0-9]{2})"
            value={this.formatDate()}
            onChange={event => {this.onChangeDate(event.currentTarget.value)} }
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
          />
        </div>
			</div>
		);
	}
}
