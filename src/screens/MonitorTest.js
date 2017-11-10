import React, { Component } from 'react';
import './MonitorTest.css';

import TestStatus from '../components/TestStatus';

import io from 'socket.io-client';

import header from '../utils/header';
import authorize from '../utils/authorize';
import config from '../utils/config';

export default class MonitorTest extends Component {
	constructor(props) {
		super(props)
		this.state = {monitoring: false, status: {taking: [], finished: []}}
		this.socket = io(config.url + ':3001')
	}

	monitor = () => {
		const payload = {
			token: window.localStorage.getItem('TestakerToken'),
			id: document.getElementById('testid').value
		}
		this.socket.emit('auth', payload)
		this.socket.on('auth', (data) => {
			if (data === 'Authorized') {
				this.setState({monitoring: true})
				setInterval(()=>{
					this.socket.emit('status', 'asdf')
				}, 1000)
			}
		})

		this.socket.on('status', (data) => {
			if (data === 'Test not being taken') {
				this.setState({status: {taking: [], finished: this.state.status.finished}})
				return
			}
			this.setState({status: data})
		})
	}

	render() {
		return authorize(
			<div>
				{header('Monitor Test')}
				<div className = 'container'>
					{(()=>{
						if (!this.state.monitoring) {
							return (<div>
								<p>Test ID: </p>
								<input id = 'testid' />
								<div className = 'button' onClick = {this.monitor}><p>Monitor</p></div>
							</div>)
						}

						return (
							<div>
								<p>Still taking: {this.state.status.taking.length}</p>
								<p>Finished: {this.state.status.finished.length}</p>
								{(()=>{
									if (this.state.status.taking.length === 0) {
										return (<p><i>Test finished</i></p>)
									}
									let answer = []
									let counter = 0;
									for (let taker of this.state.status.taking) {
										answer.push(<TestStatus number = {++counter} name = {taker[0]} status = 'Taking' key = {counter} />)
									}

									for (let finisher of this.state.status.finished) {
										answer.push(<TestStatus number = {++counter} name = {finisher[0]} status = 'Finished' key = {counter} />)
									}
									return answer
								})()}
							</div>
						)
					})()}
				</div>
			</div>
		, '/monitor')
	}
}