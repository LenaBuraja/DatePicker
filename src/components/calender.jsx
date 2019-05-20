import React from 'react';
import '../assets/styles/styles.css';

export default class CalenderJSX extends React.Component {
	constructor() {
    super();
    this.state = {
      showCalender: true
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
        <div className="calender" hidden={this.state.showCalender}>Calender</div>
			</div>
		);
	}
}
