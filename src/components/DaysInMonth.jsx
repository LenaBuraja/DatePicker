import React from 'react';
import '../assets/styles/styles.css';

export default class DaysInMonthJSX extends React.Component {
	constructor() {
    super();
    this.state = {
      selectDay: new Date().getDate()
    }
	}

	render() {
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }

    function dayOfWeek(date) {
      return date.getDay();
    }

    function tableDays() {
      const month = new Date(2019, 1, 1).getMonth();
      const year = new Date(2019, 1, 1).getFullYear();
      let days = Array.from({length: daysInMonth(month + 1, year)}, (v, k) => k+1);
      const dow = dayOfWeek(new Date(year, month, 1));
      if(dow !== 0) {
        days = [...Array.from(Array(dow - 1), () => 0)].concat(days);
      }
      if(days.length % 7 !== 0) {
        days = days.concat([...Array.from(Array(7 - days.length % 7), () => 0)]);
      }
      return days;
    }

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
          tableDays().map(item => {return <div>{item}</div>}).reduce((p,c)=>{
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
