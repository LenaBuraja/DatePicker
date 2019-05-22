import React from 'react';
import '../assets/styles/styles.css';
import DaysInMonthJSX from './DaysInMonth';
import PropsType from 'prop-types';

const namesMonthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export default class CalenderJSX extends React.Component {
	constructor() {
    super();
    this.state = {
      //showCalender: true
      showCalender: false,
      showSelectMonth: false
    }
	}

	render() {
		return (
			<div className="calender">
        <div>Calender</div>
        <div className="month-and-year">
          <div className="month" onClick={() => {this.setState({showSelectMonth: !this.state.showSelectMonth})}}>Month</div>
          <div className="year">Year</div>
        </div>
        {
          this.state.showSelectMonth ?
            <div className="monthes">
              {namesMonthes.map((item, idx) => {
                return <div 
                  className="nameMonth"
                  key={idx}
                  onClick={() => {
                    this.props.onChangeSelectMonth(idx);
                    this.setState({showSelectMonth: !this.state.showSelectMonth})
                  }}
                >{item}</div>}).reduce((p,c)=>{
              if(p[p.length-1].length == 3){
                p.push([]);
              }
            p[p.length-1].push(c);
            return p;
          }, [[]]).map((item, idx) => {return <div key={idx}>{item}</div>})}
            </div>
          :
          <div>
            <div className="days">Days</div>
              <DaysInMonthJSX
                onChangeSelectDay={this.props.onChangeSelectDay}
                selectDay={this.props.selectDay}
                selectMonth={this.props.selectMonth}
              />
              <div className="today" onClick={() => {this.props.onChangeSelectDay(new Date().getDate())}}>Сегодня
            </div>
          </div>
        }
        
			</div>
		);
	}
}

CalenderJSX.propsType = {
	onChangeSelectDay: PropsType.func.isRequired,
	selectDay: PropsType.number.isRequired,
	onChangeSelectMonth: PropsType.func.isRequired,
	selectMonth: PropsType.number.isRequired,
}
