import React, { Component } from 'react';
import Score from '../components/Score';
import header from '../utils/header';
import authorize from '../utils/authorize';

import axios from 'axios';

import './Results.css';

export default class Results extends Component {
	constructor(props) {
		super(props)
		this.state = {results: null}
	}

	getResults = async () => {
		const url = `http://13.58.54.246/api/getResults?id=${document.getElementById('testid').value}`
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
						let numRight = 0
						for (let score of this.state.results) {
							for (let question in score.result) {
								if (score.result[question] === true) {
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