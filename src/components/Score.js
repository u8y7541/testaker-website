import React, { Component } from 'react';
import './Score.css';

export default class Score extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<table className = 'score' cellPadding = '20px'>
				<tr>
					<td>{this.props.name}</td>
					<td>{this.props.score}</td>
					<td>{this.props.date}</td>
				</tr>
			</table>
		)
	}
}