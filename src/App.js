import React, { Component } from 'react';
import './styles/app.css';
import Clock from './helper/Clock';
const weatherApi = 'https://fcc-weather-api.glitch.me/api/current?';
const defaultState = {
	location: '',
	temperature: null,
	unit: null,
	weather: '',
	icon: ''
};

class Temperature {
	constructor(temp, unit) {
		this.temp = temp;
		this.unit = unit;
	}

	CtoF(c) {
		return c * 9 / 5 + 32;
	}

	FtoC(f) {
		return (f - 32) * 5 / 9;
	}

	switch() {
		if (this.unit === 'C') {
			this.temp = this.CtoF(this.temp);
			this.unit = 'F';
		} else {
			this.temp = this.FtoC(this.temp);
			this.unit = 'C';
		}
	}

	getTemp() {
		return this.temp;
	}

	getUnit() {
		return this.unit;
	}
}

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = defaultState;

		this.success = this.success.bind(this);
		this.error = this.error.bind(this);
		this.getWeatherInfo = this.getWeatherInfo.bind(this);
		this.updateWeatherState = this.updateWeatherState.bind(this);
	}

	async getWeatherInfo(latitude, longitude) {
		const response = await fetch(weatherApi + 'lon=' + longitude + '&lat=' + latitude);
		if (!response.ok) {
			this.setState({
				location: 'Network response was not ok'
			});
			return;
		}
		return await response.json();
	}

	updateWeatherState(info) {
		this.temp = new Temperature(info.main.temp, 'C');

		this.setState(
			{
				location: info.name + ', ' + info.sys.country,
				temperature: this.temp.getTemp(),
				unit: this.temp.getUnit(),
				weather: info.weather[0].main,
				icon: info.weather[0].icon
			},
			() => {
				document.getElementById('switch-unit').addEventListener('click', (event) => {
					this.temp.switch();
					this.setState({
						temperature: this.temp.getTemp(),
						unit: this.temp.getUnit()
					});
				});
			}
		);
	}

	success(position) {
    const info = this.getWeatherInfo(position.coords.latitude, position.coords.longitude);
    console.log(info);
		info.then((value) => this.updateWeatherState(value)).catch((err) => {
			console.log('get weather info error: ' + err);
			this.setState({
				location: "Couldn't get weather information"
			});
		});
	}

	error() {
		this.setState({
			location: 'Unable to retrieve your location'
		});
	}

	componentDidMount() {
		if (!navigator.geolocation) {
			this.setState({
				location: 'Geolocation is not supported by your browser'
			});
		} else {
			navigator.geolocation.getCurrentPosition(this.success, this.error);
		}
	}

	render() {
		return (
			<div id="weather-app">
				<h1 className="title">Weather app</h1>
				<div className="wrap">
					<Clock weather={this.state.weather} icon={this.state.icon} />

					<div className="main">
						<div className="mainWrap">
							<div>
								<p id="location" className="location">
									{this.state.location}
								</p>
								<div id="temperature" className="temperature">
									<span>
										{Math.round(this.state.temperature)}
										{this.state.temperature != null ? <span>°</span> : <span />}
										{this.state.unit}
									</span>
								</div>
								<button className="btn" id="switch-unit">
									Change to {this.state.unit === 'F' ? '°C' : '°F'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
