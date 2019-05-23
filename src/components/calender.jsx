import React from 'react';
import '../assets/styles/styles.css';
import DaysInMonthJSX from './DaysInMonth';
import PropsType from 'prop-types';

const namesMonthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export default class CalenderJSX extends React.Component {
	constructor() {
    super();
    this.state = {
      showCalender: false,
      showSelectMonth: false
    }
	}

	render() {
		return (
			<div className="calender">
        <div className="month-and-year">
          <div className="month" onClick={() => {this.setState({showSelectMonth: !this.state.showSelectMonth})}}>{namesMonthes[this.props.selectMonth]}</div>
          {//<input value={this.props.selectYear} onChange={(e) => this.props.onChangeSelectYear(e.currentTarget.value)} />
          }<select
            className="year"
            value={this.props.selectYear}
            onChange={(e) => this.props.onChangeSelectYear(e.currentTarget.value)}
          >
            {
              Array.from(Array(new Date().getFullYear() - 1949), (v, k) => <option key={k + 1960} value={k + 1960}>{k + 1960}</option>)
            }
          </select>
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
                >{item.slice(0, 3)}</div>}).reduce((p,c)=>{
              if(p[p.length-1].length == 4){
                p.push([]);
              }
            p[p.length-1].push(c);
            return p;
          }, [[]]).map((item, idx) => {return <div className="groupMonthes" key={idx}>{item}</div>})}
            </div>
          :
          <div>
            <DaysInMonthJSX
              onChangeSelectDay={this.props.onChangeSelectDay}
              selectDay={this.props.selectDay}
              selectMonth={this.props.selectMonth}
              selectYear={this.props.selectYear}
              onChangeSelectMonth={this.props.onChangeSelectMonth}
            />
            <div
              className="today"
              onClick={() => {
                this.props.onChangeSelectDay(new Date().getDate());
                this.props.onChangeSelectMonth(new Date().getMonth());
                this.props.onChangeSelectYear(new Date().getFullYear());
              }}
            >Сегодня</div>
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
	onChangeSelectYear: PropsType.func.isRequired,
	selectYear: PropsType.number.isRequired,
}
