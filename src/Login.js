import React, { Component } from 'react';

export default class Login extends Component {
	async login() {
		let email = document.getElementById("email").value
		let password = document.getElementById("password").value

		const body = {"email":email, "password":password}
		const headers = new Headers({
			"Content-Type": "application/json",
		})
		const options = {
			method: "POST",
			mode: "no-cors",
			headers: headers,
			body: JSON.stringify(body)
		}
		console.log(options)
		const response = await fetch('http://13.58.54.246/login', options)
		const json = await response.json()
		console.log(json)
	}

	render() {
		return (
			<div>
				<div className = "header">
					<p>Login</p>
				</div>
				<div className = "container">
					<h3>Enter your email and password.</h3>
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