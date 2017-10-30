import React, { Component } from 'react';
import './MonitorTest.css';

import io from 'socket.io-client';

import header from '../utils/header';
import authorize from '../utils/authorize';

export default class MonitorTest extends Component {
	constructor(props) {
		super(props)
		this.state = {monitoring: false, status: {}}
		this.socket = io('http://13.58.54.246:3001')
	}

	monitor = () => {
		console.log('clicked')
		this.socket.emit('auth', window.localStorage.getItem('TestakerToken'), document.getElementById('testid'),
		(data) => {
			if (data === 'Authorized') {
				this.setState({monitoring: true})
				setInterval(this.socket.emit('status'), 1000)
			}
		})

		this.socket.on('status', (data) => {
			this.setState({status: data})
			console.log(data)
		})
	}

	render() {
		return authorize(
			<div>
				{header('Monitor Test')}
				<div className = 'container'>
					{(()=>{
						console.log('re-rendering')
						if (!this.state.monitoring) {
							return (<div>
								<p>Test ID: </p>
								<input id = 'testid' />
								<div className = 'button' onClick = {this.monitor}><p>Monitor</p></div>
							</div>)
						}

						return (
							<div>
								<p>{this.state.status}</p>
							</div>
						)
					})()}
				</div>
			</div>
		, '/monitor')
	}
}