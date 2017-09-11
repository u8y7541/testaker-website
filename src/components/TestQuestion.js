import React, { Component } from 'react';
import './TestQuestion.css'

export default class TestQuestion extends Component {
	constructor(props) {
		super(props)
		this.state = {testQuestion: '', questionType: 'multiplechoice', answerChoices: ['', '', '', ''], correctAnswer: ''}
	}

	question = (number) => {
		return (event) => {
			this.setState({testQuestion: document.getElementById(`question${number}`).value})
			window.test[number - 1]["question"] = document.getElementById(`question${number}`).value
		}
	}

	questionType = (number) => {
		return (event) => {
			this.setState({questionType: event.target.value})
			window.test[number-1]["freeResponse"] = (event.target.value === 'freeresponse')
			if (event.target.value === 'singleresponse' || event.target.value === 'freeresponse') {
				window.test[number-1]["answerChoices"] = []
			}
		}
	}

	multipleChoice(index, number) {
		return (async () => {
			this.state.answerChoices[index] = document.getElementById(`choice-${number}-${index}`).value
			window.test[number - 1]["answerChoices"] = this.state.answerChoices
			this.render()
		})
	}

	render() {
		let {number} = this.props
		return (
			<div className = "testQuestion">
				<h3>{number}. </h3>
				<textarea rows = {5} cols = {100} placeholder = 'Question text' value = {this.state.testQuestion}
						  id = {`question${number}`} onChange = {this.question(number)} />
				<br />
				<select value = {this.state.value} onChange = {this.questionType(number)}>
					<option value = "multiplechoice">Multiple Choice</option>
					<option value = "singleresponse">Single Response</option>
					<option value = "freeresponse">Free Response</option>
				</select>

				{(()=>{
					switch (this.state.questionType) {
						case 'multiplechoice':
							return (
								<div>
									<div>
										<h3>Enter each answer choice:</h3>
										<p className = "choice">a)</p>
										<input className = "choice" id = {`choice-${number}-0`} onChange = {this.multipleChoice(0, number)} />
										<br />
										
										<p className = "choice">b)</p>
										<input className = "choice" id = {`choice-${number}-1`} onChange = {this.multipleChoice(1, number)} />
										<br />
										
										<p className = "choice">c)</p>
										<input className = "choice" id = {`choice-${number}-2`} onChange = {this.multipleChoice(2, number)} />
										<br />
										
										<p className = "choice">d)</p>
										<input className = "choice" id = {`choice-${number}-3`} onChange = {this.multipleChoice(3, number)} />
										<br />
									</div>
									<div>
										<p className = "choice">Correct answer:</p>
										<select value = {this.state.value}
												onChange = {(event)=>{window.test[number-1]["correctAnswer"] = this.state.answerChoices[event.target.value]}}
												className = "choice">
											<option value = "0">a</option>
											<option value = "1">b</option>
											<option value = "2">c</option>
											<option value = "3">d</option>
										</select>
									</div>
								</div>
							)
						case 'singleresponse':
							return (
								<div>
									<p className = "choice">Correct answer:</p>
									<input className = "choice" id = {`answer${number}`}
										   onChange = {()=>{window.test[number-1]["correctAnswer"] = document.getElementById(`answer${number}`).value}}/>
								</div>
							)
					}

				})()}
			</div>
		)
	}
}
