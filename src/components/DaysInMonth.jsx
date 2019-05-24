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
    const month = new Date(this.props.selectYear, this.props.selectMonth, 1).getMonth();
    const year = new Date(this.props.selectYear, 1, 1).getFullYear();
    let days = Array.from({length: this.daysInMonth(this.props.selectMonth + 1, year)}, (v, k) => 
      <div
        className={this.props.selectDay === k+1 ? 'selectDay' : 'otherDay'}
        onClick={() => this.props.onChangeSelectDay(k+1)}
        key={`c-${k}`}
      >{k+1}</div>
    );
    const dow = this.dayOfWeek(new Date(year, this.props.selectMonth, 1));
    if(dow !== 0) {
      const lastDayInPrevMounth = this.daysInMonth(this.props.selectMonth, year);
      days = [...Array.from(Array(dow - 1), (v, k) => 
        <div className='prevMonth' key={`p-${k}`}>{lastDayInPrevMounth-dow+k+1}</div>
      )].concat(days);
    }
    if(days.length % 7 !== 0) {
      days = days.concat([...Array.from(Array(7 - days.length % 7), (v, k) => <div className='nextMonth' key={`n-${k}`}>{k + 1}</div>)]);
    }
    return days;
  }

	render() {
    
		return (
			<div className="daysInMonth">
        <div className="namesOfDayInWeek">
          <div key={'Пн'}>Пн</div>
          <div key={'Вт'}>Вт</div>
          <div key={'Ср'}>Ср</div>
          <div key={'Чт'}>Чт</div>
          <div key={'Пт'}>Пт</div>
          <div key={'Сб'}>Сб</div>
          <div key={'ВС'}>ВС</div>
        </div>
        <div className="showMonth">
          <div
            className="showPrev"
            onClick={() => {
              if(this.props.selectMonth - 1 < 0) {
                this.props.onChangeSelectMonth(11)
                this.props.onChangeSelectYear(this.props.selectYear - 1);
              } else {
                this.props.onChangeSelectMonth(this.props.selectMonth - 1);
              }
            }}
          ></div>
          <div className="weeks">
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
          <div
            className="showNext"
            onClick={() => {
              if(this.props.selectMonth + 1 > 11) {
                this.props.onChangeSelectMonth(0)
                this.props.onChangeSelectYear(this.props.selectYear + 1);
              } else {
                this.props.onChangeSelectMonth(this.props.selectMonth + 1);
              }
            }}
          ></div>
        </div>
        
			</div>
		);
	}
}

DaysInMonthJSX.propsType = {
  onChangeSelectDay: PropsType.func.isRequired,
  onChangeSelectMonth: PropsType.func.isRequired,
	onChangeSelectYear: PropsType.func.isRequired,
	selectYear: PropsType.number.isRequired,
	selectDay: PropsType.number.isRequired,
	selectMonth: PropsType.number.isRequired,
	selectYear: PropsType.number.isRequired,
}
