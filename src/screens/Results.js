import React, { Component } from 'react';
import header from '../utils/header';
import authorize from '../utils/authorize';

import './Results.css';

export default class Results extends Component {
	render() {
		return authorize(
			<div>
				{header("View Results")}
				<div className="container">
					
				</div>
			</div>
		, '/results')
	}
}