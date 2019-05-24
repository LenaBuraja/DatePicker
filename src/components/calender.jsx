import React from 'react';
import '../assets/styles/styles.css';
import DaysInMonthJSX from './DaysInMonth';
import PropsType from 'prop-types';

const namesMonthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const valuesYears = Array.from(
  Array(new Date().getFullYear() - 1949 + ( 12 - (new Date().getFullYear() - 1949) % 12 )),
  (v, k) => k + 1960
).reduce((p,c)=>{
  if(p[p.length-1].length == 12){
    p.push([]);
  }
  p[p.length-1].push(c);
  return p;
}, [[]])

export default class CalenderJSX extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      showCalender: false,
      showSelectMonth: false,
      showSelectYear: false,
      showGroupYears: valuesYears.findIndex((item) => item.includes(Number(this.props.selectYear)))
    }
	}

	render() {
		return (
			<div className="calender">
        <div className="month-and-year">
          <div
            className="month"
            onClick={() => {
              this.setState({showSelectMonth: !this.state.showSelectMonth})
              this.setState({showSelectYear: false})
            }}
          >{namesMonthes[this.props.selectMonth]}</div>
          <div
            className="year"
            onClick={() => {
              this.setState({showSelectYear: !this.state.showSelectYear})
              this.setState({showSelectMonth: false})
            }}
          >{this.props.selectYear}</div>
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
                    this.setState({showSelectYear: false});
                  }}
                >{item.slice(0, 3)}</div>}).reduce((p,c)=>{
                  if(p[p.length-1].length == 4){
                    p.push([]);
                  }
                  p[p.length-1].push(c);
                  return p;
                }, [[]]).map((item, idx) => {return <div className="groupMonthes" key={idx}>{item}</div>
              })}
            </div>
            : this.state.showSelectYear ?
            <div className="showYears">
              <div
                className="showPrev"
                hidden={this.state.showGroupYears - 1 === 0}
                onClick={() => {
                  this.setState({showGroupYears: this.state.showGroupYears - 1})
                }}
              ></div>
              <div className="years">
                {valuesYears[this.state.showGroupYears].map((item, idx) => {
                  return <div 
                    className="valueYears"
                    key={idx}
                    onClick={() => {
                      this.props.onChangeSelectYear(item);
                      this.setState({showSelectYear: !this.state.showSelectYear})
                      this.setState({showSelectMonth: false})
                    }}
                  >{item}</div>}).reduce((p,c)=>{
                    if(p[p.length-1].length == 4){
                      p.push([]);
                    }
                    p[p.length-1].push(c);
                    return p;
                  }, [[]]).map((item, idx) => {return <div className="groupYears" key={idx}>{item}</div>
                })}
              </div>
              <div
                className="showNext"
                hidden={this.state.showGroupYears + 1 > valuesYears.length - 1}
                onClick={() => {
                  this.setState({showGroupYears: this.state.showGroupYears + 1})
                }}
              ></div>
            </div>
          :
          <div>
            <DaysInMonthJSX
              onChangeSelectDay={this.props.onChangeSelectDay}
              selectDay={this.props.selectDay}
              selectMonth={this.props.selectMonth}
              selectYear={this.props.selectYear}
              onChangeSelectMonth={this.props.onChangeSelectMonth}
              onChangeSelectYear={this.props.onChangeSelectYear}
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
