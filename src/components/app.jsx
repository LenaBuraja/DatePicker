import React from 'react';
import '../assets/styles/styles.css';
import CalenderJSX from './calender';

export default class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="app">
				<CalenderJSX />
			</div>
		);
	}
}
