import React from 'react';
import '../assets/styles/styles.css';
import PropsType from 'prop-types';

export default class DaysInMonthJSX extends React.Component {
	constructor() {
    super();
    this.state = {
      selectDay: new Date().getDate()
    }
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  dayOfWeek(date) {
    return date.getDay();
  }

  tableDays() {
    const month = new Date(2019, this.props.selectMonth, 1).getMonth();
    const year = new Date(2019, 1, 1).getFullYear();
    let days = Array.from({length: this.daysInMonth(this.props.selectMonth + 1, year)}, (v, k) => 
      <div
        className={this.props.selectDay === k+1 ? 'selectDay' : 'otherDay'}
        onClick={() => this.props.onChangeSelectDay(k+1)}
        key={v}
      >{k+1}</div>
    );
    const dow = this.dayOfWeek(new Date(year, this.props.selectMonth, 1));
    if(dow !== 0) {
      const lastDayInPrevMounth = this.daysInMonth(this.props.selectMonth, year);
      days = [...Array.from(Array(dow - 1), (v, k) => 
        <div className='prevMonth' key={v}>{lastDayInPrevMounth-dow+k+1}</div>
      )].concat(days);
    }
    if(days.length % 7 !== 0) {
      days = days.concat([...Array.from(Array(7 - days.length % 7), (v, k) => <div className='nextMonth' key={v}>{k + 1}</div>)]);
    }
    return days;
  }

	render() {
    
		return (
			<div className="daysInMonth">
        <div className="namesOfDayInWeek">
          <div>Пн</div>
          <div>Вт</div>
          <div>Ср</div>
          <div>Чт</div>
          <div>Пт</div>
          <div>Сб</div>
          <div>ВС</div>
        </div>
        {
          this.tableDays(this.state.selectDay).reduce((p,c)=>{
              if(p[p.length-1].length == 7){
                p.push([]);
              }
            p[p.length-1].push(c);
            return p;
          }, [[]]).map((item, idx) => {return <div className="week" key={idx}>{item}</div>})
        }
			</div>
		);
	}
}

DaysInMonthJSX.propsType = {
	onChangeSelectDay: PropsType.func.isRequired,
	selectDay: PropsType.number.isRequired,
	selectMonth: PropsType.number.isRequired,
}
