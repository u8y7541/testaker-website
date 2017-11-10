import React, { Component } from 'react';

import axios from 'axios';
import header from '../utils/header';
import authorize from '../utils/authorize';
import config from '../utils/config';

export default class CreateAccount extends Component {
	constructor(props) {
		super(props)
		this.state = {accountExists: false}
	}

	createAccount = async () => {
		let email = document.getElementById("email").value
		let password = document.getElementById("password").value
		const body = {"email":email, "password":password}

		const headers = {'Content-Type': 'application/json'}
		const options = {
			method: "POST",
			url: config.url + "/api/createAccount",
			headers: headers,
			data: JSON.stringify(body)
		}
		const response = await axios(options)
		console.log(response)
	}

	render() {
		return authorize(
			<div>
				{header('Create an account')}
				<div className = 'container'>
					<h3>Enter your email and password.</h3>
					<p>Email: <input id = 'email' /></p>
					<p>Password: <input id = 'password' /></p>
					<p>Confirm password: <input id = 'confirm-password' /></p>
					<p>
					{document.getElementById('password').value === document.getElementById('confirm-password').value ?
						<p style = {{color: 'red', fontSize: 18}}>Passwords do not match.</p>
						:null}
					</p>
					
					<div style = {{
						textAlign: "center",
						display: (document.getElementById('password').value === document.getElementById('confirm-password').value ?
									"block":"none")}}>
						<div className = "button" onClick = {this.createAccount}>Create Account</div>
		            </div>
				</div>
			</div>
		, '/createAccount')
	}
}