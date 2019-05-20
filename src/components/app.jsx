import React from 'react';
import '../assets/styles/styles.css';
import InputDateJSX from './InputDate';

export default class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="app">
				<InputDateJSX />
			</div>
		);
	}
}
