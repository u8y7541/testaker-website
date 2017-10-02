import React, { Component } from 'react';
import Login from '../screens/Login';

const authorize = (stuff, url) => {
	if (window.localStorage.getItem('TestakerToken') === null) {
		return (<Login url = {url} />)
	}
	return stuff
}

export default authorize;