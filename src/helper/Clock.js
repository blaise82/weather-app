import React, { Component } from 'react';
const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
const fullDate = new Date();
const d = fullDate.getDay();
const m = fullDate.getMonth();
const dayName = days[d];
var r = fullDate.getDate();
const monthNames = months[m];

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date().toLocaleTimeString()
		};
	}
	componentDidMount() {
		this.intervalID = setInterval(() => this.tick(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
	tick() {
		this.setState({
			time: new Date().toLocaleTimeString()
		});
	}
	render() {
		return (
			<div className="header">
				<div className="day">
					<h1>{dayName}</h1>
					<p className="App-clock">{this.state.time}.</p>
				</div>
				<div className="month">
					<div>
						<p className="monthDay">{r}</p>
						<p className="monthName">{monthNames}</p>
						<p>#{this.props.weather}</p>
					</div>
					<div>
						<img src={this.props.icon} alt={this.props.weather} />
					</div>
				</div>
			</div>
		);
	}
}

export default Clock;
