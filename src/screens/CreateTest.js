import React, { Component } from 'react';
import './CreateTest.css';
import TestQuestion from '../components/TestQuestion';
import Login from './Login';

import axios from 'axios';
import header from '../utils/header';
import authorize from '../utils/authorize';
import config from '../utils/config';

window.test = [{questionType: "multiplechoice", freeResponse: false}] 


export default class CreateTest extends Component {
	constructor(props) {
		super(props)
		this.state = {number: 1, testID: ''}
	} 

	submit = async () => {
		let result = window.test.map((item)=>(item.answerChoices ? item : Object.assign(item, {answerChoices: []})))
		console.log(JSON.stringify(result))

		const body = {"id": this.state.testID,
					  "test": JSON.stringify(result),
					  "token": window.localStorage.getItem('TestakerToken')}
		const headers = {'Content-Type': 'application/json'}
		const options = {
			method: "POST",
			url: config.url + "/api/createTest",
			headers: headers,
			data: JSON.stringify(body)
		}
		const response = await axios(options)

		//await fetch(config.url + `/api/createTest?id=${this.state.testID}&test=${encodeURIComponent(JSON.stringify(result))}`, {mode: "no-cors", method: "POST"})
		document.getElementById('testuploaded').innerHTML = "Test successfully uploaded."
	}

	render() {
		return authorize(
			<div>
				{header("Create a test")}
				<div className = "container">
					<h3>Test settings</h3>
					<p className = "choice">Test ID:</p>
					<input id = 'testid' className = "choice"
						   onChange = {()=>{this.setState({testID: document.getElementById('testid').value})}} />
					<h3>Enter the questions below:</h3>
					<hr />
					{(()=>{
						let result = []
						for (var i = 0; i < this.state.number; i++) {
							result.push(<TestQuestion key = {i} number = {i+1} />)
						}
						this.result = result
						return result
					})()}
					<br />
					<div className = "smallButton"
						 onClick = {() => {this.setState({number: this.state.number + 1}); window.test.push({questionType: "multiplechoice", freeResponse: false})}}>+</div>
					<br />
					<div className = "button" onClick = {this.submit}>Upload test</div>
					<p id = 'testuploaded'></p>
				</div>
			</div>
		, '/createTest')
	}
}
