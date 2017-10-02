import React, { Component } from 'react';

const header = (text, subtitle = '') => {
	return (
		<div className = 'header'>
			<p>{text}</p>
			<p style = {{fontSize: '35px'}}>{subtitle}</p>
		</div>
	)
}

export default header;