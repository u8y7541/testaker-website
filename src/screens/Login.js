import React, { Component } from 'react';
import axios from 'axios';
import header from '../utils/header';
import config from '../utils/config';

import './Login.css';

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {invalid: false}
	}

	login = async () => {
		let email = document.getElementById("email").value
		let password = document.getElementById("password").value

		const body = {"email":email, "password":password}
		const headers = {'Content-Type': 'application/json'}
		const options = {
			method: "POST",
			url: config.url + "/api/login",
			headers: headers,
			data: JSON.stringify(body)
		}
		const response = await axios(options)
		const token = response.data.token
		if (token === 'Invalid') {
			this.setState({invalid: true})
			window.localStorage.removeItem('TestakerToken')
			return
		}
		window.localStorage.setItem('TestakerToken', token)

		window.location = this.props.url
	}

	render() {
		return (
			<div>
				{header('Login')}
				<div className = "container">
					<h3>Enter your email and password.</h3>
					{this.state.invalid ? <p className = 'invalid'>Invalid email or password</p>:null}
					<input placeholder = "Email" id = "email"/>
					<br />
					<input type = "password" placeholder = "Password" id = "password" />

					<div style = {{textAlign: "center"}}>
		              <div className = "button" onClick = {this.login}>Login</div>
		            </div>
				</div>
			</div>
		)
	}
}