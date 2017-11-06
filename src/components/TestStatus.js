import React, { Component } from 'react';
import './TestStatus.css';

export default class TestStatus extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<table className = 'status' cellPadding = '20px'>
				<tr>
					<td>{this.props.number}.</td>
					<td>{this.props.name}</td>
					<td>{this.props.status}</td>
				</tr>
			</table>
		)
	}
}