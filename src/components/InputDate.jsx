import React from 'react';
import '../assets/styles/styles.css';
import CalenderJSX from './Calender';

export default class InputDateJSX extends React.Component {
	constructor() {
    super();
    this.state = {
      //showCalender: true
      showCalender: false
    }
	}

	render() {
		return (
			<div className="inputDate">
        <div className="field">
          <input type="text" className="value"/>
          <div
            className="showCalender"
            onClick={() => {
              this.setState({showCalender: !this.state.showCalender});
            }}
          >Click</div>
        </div>
        <div hidden={this.state.showCalender}>
          <CalenderJSX />
        </div>
			</div>
		);
	}
}
