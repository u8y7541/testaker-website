import React, { Component } from 'react';
import './CreateTest.css';
import TestQuestion from './components/TestQuestion';

window.test = [{questionType: "multiplechoice", freeResponse: false}] 


export default class CreateTest extends Component {
	constructor(props) {
		super(props)
		this.state = {number: 1, testID: ''}
	} 

	submit = async () => {
		let result = window.test.map((item)=>(item.answerChoices ? item : Object.assign(item, {answerChoices: []})))
		console.log(JSON.stringify(result))

		await fetch(`http://13.58.54.246/createTest?id=${this.state.testID}&test=${encodeURIComponent(JSON.stringify(result))}`, {mode: "no-cors", method: "POST"})
		document.getElementById('testuploaded').value = "Test successfully uploaded."
	}

	render() {
		return (
			<div>
				<div className = "header">
					<p>Create a test</p>
				</div>
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
		)
	}
}
