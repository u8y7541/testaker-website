import React, { Component } from 'react';
import Score from '../components/Score';
import header from '../utils/header';
import authorize from '../utils/authorize';
import config from '../utils/config';

import axios from 'axios';

import './Results.css';

export default class Results extends Component {
	constructor(props) {
		super(props)
		this.state = {results: null}
	}

	getResults = async () => {
		const url = config.url + `/api/getResults?id=${document.getElementById('testid').value}`
		const headers = {"Content-Type": "application/json"}
		const body = {"token": window.localStorage.getItem('TestakerToken')}
		const options = {
			method: "POST",
			url: url,
			headers: headers,
			data: JSON.stringify(body)
		}
		const response = await axios(options)
		this.setState({results: response.data})	
	}

	render() {
		return authorize(
			<div>
				{header("View Results")}
				<div className="container">
					<center>
					{(()=>{
						if (this.state.results === null) {
							return (
								<div>
									<p>Enter test ID:</p>
									<input id = 'testid' />
									<div className = 'button' onClick = {this.getResults}><p>Get scores</p></div>
								</div>
							)
						}
						let answer = [<Score name = 'Name' score = 'Score' date = 'Date' />]
						for (let score of this.state.results) {
							let numRight = 0
							for (let [i, question] of score.result.entries()) {
								if (question['q'+(i+1)]) {
									numRight++;
								}
							}
							answer.push(<Score name = {score.name} score = {`${numRight}/${Object.keys(score.result).length}`} date = {score.timestamp} />)
						}

						return answer
					})()}
					</center>
				</div>
			</div>
		, '/results')
	}
}